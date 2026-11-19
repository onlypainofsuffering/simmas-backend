import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CloudinaryService } from '../common/cloudinary.service';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

type ProfileTarget = {
  role: string;
  find: () => Promise<any>;
  update: (data: Record<string, any>) => Promise<any>;
  nameOf: (row: any) => string;
};

@Injectable()
export class ProfileService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  private async target(user: any): Promise<ProfileTarget> {
    const id = Number(user?.id);
    if (!Number.isFinite(id)) {
      throw new ForbiddenException('Identitas pengguna tidak valid');
    }

    const role = String(user?.role || '').toUpperCase();
    const select = { id: true, email: true, fotoUrl: true };

    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      return {
        role: 'admin',
        find: () => this.prisma.user.findUnique({ where: { id }, select: { ...select, name: true } }),
        update: data => this.prisma.user.update({ where: { id }, data: data as any, select: { ...select, name: true } }),
        nameOf: row => row.name,
      };
    }

    if (role === 'GURU') {
      return {
        role: 'guru',
        find: () => this.prisma.guru.findUnique({ where: { id }, select: { ...select, namalengkap: true } }),
        update: data => this.prisma.guru.update({ where: { id }, data: data as any, select: { ...select, namalengkap: true } }),
        nameOf: row => row.namalengkap,
      };
    }

    if (role === 'SISWA') {
      return {
        role: 'siswa',
        find: () => this.prisma.siswa.findUnique({ where: { id }, select: { ...select, nama: true } }),
        update: data => this.prisma.siswa.update({ where: { id }, data: data as any, select: { ...select, nama: true } }),
        nameOf: row => row.nama,
      };
    }

    throw new ForbiddenException('Role tidak dikenali');
  }

  private shape(row: any, target: ProfileTarget) {
    return {
      id: row.id,
      nama: target.nameOf(row),
      email: row.email,
      role: target.role,
      fotoUrl: row.fotoUrl ?? null,
    };
  }

  async getProfile(user: any) {
    const target = await this.target(user);
    const row = await target.find();
    if (!row) throw new NotFoundException('Profil tidak ditemukan');
    return { message: 'Berhasil memuat profil', data: this.shape(row, target) };
  }

  async updateProfile(user: any, dto: UpdateProfileDto, file?: Express.Multer.File) {
    const target = await this.target(user);
    const current = await target.find();
    if (!current) throw new NotFoundException('Profil tidak ditemukan');

    const data: Record<string, any> = {};
    const nama = dto?.nama?.trim();
    if (nama) {
      if (target.role === 'admin') data.name = nama;
      else if (target.role === 'guru') data.namalengkap = nama;
      else data.nama = nama;
    }

    if (file) {
      data.fotoUrl = await this.cloudinaryService.uploadAvatar(file);
    }

    if (!Object.keys(data).length) {
      throw new BadRequestException('Tidak ada perubahan profil yang dikirim');
    }

    const updated = await target.update(data);
    return { message: 'Profil berhasil diperbarui', data: this.shape(updated, target) };
  }
}
