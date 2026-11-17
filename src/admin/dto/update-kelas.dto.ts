import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Jurusan } from '@prisma/client';

export class UpdateKelasDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  nama?: string;

  @IsOptional()
  @IsEnum(Jurusan, {
    message: 'Jurusan harus RPL, TKJ, atau MM',
  })
  jurusan?: Jurusan;
}
