CREATE INDEX IF NOT EXISTS "siswa_status_idx" ON "siswa"("status");
CREATE INDEX IF NOT EXISTS "siswa_kelas_idx" ON "siswa"("kelas");
CREATE INDEX IF NOT EXISTS "siswa_created_at_idx" ON "siswa"("createdAt");

CREATE INDEX IF NOT EXISTS "guru_status_idx" ON "guru"("status");
CREATE INDEX IF NOT EXISTS "guru_jurusan_idx" ON "guru"("jurusan");
CREATE INDEX IF NOT EXISTS "guru_created_at_idx" ON "guru"("createdAt");

CREATE INDEX IF NOT EXISTS "dudi_status_idx" ON "dudi"("status");
CREATE INDEX IF NOT EXISTS "dudi_created_at_idx" ON "dudi"("createdAt");

CREATE INDEX IF NOT EXISTS "pengajuan_siswa_status_idx" ON "pengajuan_magang"("siswaId", "status");
CREATE INDEX IF NOT EXISTS "pengajuan_dudi_status_idx" ON "pengajuan_magang"("dudiId", "status");
CREATE INDEX IF NOT EXISTS "pengajuan_status_created_idx" ON "pengajuan_magang"("status", "createdAt");

CREATE INDEX IF NOT EXISTS "jurnal_tanggal_idx" ON "jurnal_siswa"("tanggalPelaksana");
CREATE INDEX IF NOT EXISTS "kunjungan_tanggal_idx" ON "kunjungan_guru"("tanggalKunjungan");
