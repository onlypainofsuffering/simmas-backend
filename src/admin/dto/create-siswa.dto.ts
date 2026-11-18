import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateSiswaDto {
  @IsString()
  @IsNotEmpty()
  nama!: string;

  @IsString()
  @IsNotEmpty()
  nis!: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  kelasId?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  kelas?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
