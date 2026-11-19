import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Role } from '@prisma/client';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../admin/guard/jwt-auth.guard';
import { Roles } from '../admin/decorators/roles.decorators';
import { RolesGuard } from '../admin/guard/roles.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

function imageFileFilter(
  _request: unknown,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) {
  if (!file.mimetype.startsWith('image/')) {
    return callback(new BadRequestException('Foto profil harus berupa gambar'), false);
  }
  callback(null, true);
}

@ApiTags('Profil')
@Controller('profil')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.GURU, Role.SISWA)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Memuat profil pengguna yang sedang login' })
  getProfile(@Request() request: any) {
    return this.profileService.getProfile(request.user);
  }

  @Patch()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.GURU, Role.SISWA)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        nama: { type: 'string', example: 'Budi Santoso' },
        foto: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('foto', {
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiOperation({
    summary: 'Mengubah nama dan/atau foto profil (foto dikompres dan disimpan sebagai WebP)',
  })
  updateProfile(
    @Request() request: any,
    @Body() dto: UpdateProfileDto,
    @UploadedFile() foto?: Express.Multer.File,
  ) {
    return this.profileService.updateProfile(request.user, dto, foto);
  }
}
