import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Budi Santoso', description: 'Nama baru pengguna' })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  nama?: string;
}
