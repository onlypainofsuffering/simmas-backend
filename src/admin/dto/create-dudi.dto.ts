import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDudiDto {
  @IsString()
  @IsNotEmpty()
  nama_perusahaan!: string;

  @IsString()
  @IsNotEmpty()
  alamat!: string;

  @IsString()
  @IsNotEmpty()
  bidang_usaha!: string;

  @IsBoolean()
  kuota_peserta!: boolean;

  @IsString()
  @IsNotEmpty()
  direktur!: string;

  @IsString()
  @IsNotEmpty()
  kontak!: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
