ALTER TABLE "guru" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
UPDATE "guru" SET "isActive" = false WHERE "status" = 'NONAKTIF';

ALTER TABLE "kelas" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "siswa" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "dudi" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN NOT NULL DEFAULT true;

CREATE INDEX IF NOT EXISTS "guru_is_active_idx" ON "guru"("isActive");
CREATE INDEX IF NOT EXISTS "kelas_is_active_idx" ON "kelas"("isActive");
CREATE INDEX IF NOT EXISTS "siswa_is_active_idx" ON "siswa"("isActive");
CREATE INDEX IF NOT EXISTS "dudi_is_active_idx" ON "dudi"("isActive");
