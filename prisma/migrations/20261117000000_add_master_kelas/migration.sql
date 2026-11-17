CREATE TABLE IF NOT EXISTS "kelas" (
  "id" SERIAL PRIMARY KEY,
  "nama" TEXT NOT NULL,
  "jurusan" "Jurusan" NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "kelas_nama_key" ON "kelas"("nama");

INSERT INTO "kelas" ("nama", "jurusan") VALUES
  ('X RPL 1', 'RPL'),
  ('X RPL 2', 'RPL'),
  ('XI RPL 1', 'RPL'),
  ('XI RPL 2', 'RPL'),
  ('XII RPL 1', 'RPL'),
  ('XII RPL 2', 'RPL'),
  ('X TKJ 1', 'TKJ'),
  ('XI TKJ 1', 'TKJ')
ON CONFLICT ("nama") DO NOTHING;

INSERT INTO "kelas" ("nama")
SELECT DISTINCT TRIM(s."kelas")
FROM "siswa" s
WHERE s."kelas" IS NOT NULL AND TRIM(s."kelas") <> ''
ON CONFLICT ("nama") DO NOTHING;

ALTER TABLE "siswa" ADD COLUMN IF NOT EXISTS "kelasId" INTEGER;

UPDATE "siswa" s
SET "kelasId" = k."id"
FROM "kelas" k
WHERE k."nama" = TRIM(s."kelas") AND s."kelasId" IS NULL;

UPDATE "siswa" s
SET "kelasId" = (SELECT "id" FROM "kelas" ORDER BY "id" ASC LIMIT 1),
    "kelas" = (SELECT "nama" FROM "kelas" ORDER BY "id" ASC LIMIT 1)
WHERE s."kelasId" IS NULL
  AND EXISTS (SELECT 1 FROM "kelas");

ALTER TABLE "siswa" ALTER COLUMN "kelasId" SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'siswa_kelasId_fkey') THEN
    ALTER TABLE "siswa"
      ADD CONSTRAINT "siswa_kelasId_fkey"
      FOREIGN KEY ("kelasId") REFERENCES "kelas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS "siswa_kelasId_idx" ON "siswa"("kelasId");
