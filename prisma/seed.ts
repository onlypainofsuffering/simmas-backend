
import { Jurusan, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Memulai proses seeding...');

  await prisma.$executeRawUnsafe(
    `SELECT setval(pg_get_serial_sequence('users', 'id'), COALESCE((SELECT MAX(id) FROM users), 1), (SELECT COUNT(*) > 0 FROM users))`,
  );

  const hashedPassword = await bcrypt.hash('123456', 10);

  // ADMIN
  const adminWithNewEmail = await prisma.user.findUnique({
    where: { email: 'admin@simmas.sch.id' },
  });
  if (!adminWithNewEmail) {
    await prisma.user.updateMany({
      where: { email: 'admin@gmail.com', role: Role.ADMIN },
      data: { email: 'admin@simmas.sch.id' },
    });
  }

  await prisma.user.upsert({
    where: {
      email: 'admin@simmas.sch.id',
    },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@simmas.sch.id',
      password: hashedPassword,
      phone: '082222222222',
      role: Role.ADMIN,
    },
  });

  console.log('Admin berhasil dibuat');

  // ADMIN KEDUA
  const hashedPasswordAdmin2 = await bcrypt.hash('admin123', 10);

  await prisma.user.upsert({
    where: {
      email: 'admin2@simmas.sch.id',
    },
    update: {},
    create: {
      name: 'Admin 2',
      email: 'admin2@simmas.sch.id',
      password: hashedPasswordAdmin2,
      phone: '082222222223',
      role: Role.ADMIN,
    },
  });

  console.log('Admin kedua berhasil dibuat');

  const kelasSeed: Array<{ nama: string; jurusan: Jurusan }> = [
    { nama: 'X RPL 1', jurusan: Jurusan.RPL },
    { nama: 'X RPL 2', jurusan: Jurusan.RPL },
    { nama: 'XI RPL 1', jurusan: Jurusan.RPL },
    { nama: 'XI RPL 2', jurusan: Jurusan.RPL },
    { nama: 'XII RPL 1', jurusan: Jurusan.RPL },
    { nama: 'XII RPL 2', jurusan: Jurusan.RPL },
    { nama: 'X TKJ 1', jurusan: Jurusan.TKJ },
    { nama: 'XI TKJ 1', jurusan: Jurusan.TKJ },
  ];

  for (const kelas of kelasSeed) {
    await prisma.kelas.upsert({
      where: { nama: kelas.nama },
      update: { jurusan: kelas.jurusan },
      create: kelas,
    });
  }

  console.log('Master kelas berhasil dibuat');

  console.log('Seeding selesai!');
}

main()
  .catch((error) => {
    console.error('Seeding gagal:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
