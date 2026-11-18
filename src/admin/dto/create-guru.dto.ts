import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Jurusan } from '@prisma/client';

export class CreateGuruDto {
  @IsString()
  @IsNotEmpty()
  namalengkap!: string;

  @IsString()
  @IsNotEmpty()
  nip!: string;

  @IsString()
  @IsNotEmpty()
  alamat! : string;

  @IsString()
  @IsEnum(Jurusan, {
    message: 'Jurusan harus RPL, TKJ, atau MM',
  })
  jurusan!: Jurusan;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
