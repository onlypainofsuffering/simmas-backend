import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { SiswaModule } from './siswa/siswa.module';
import { GuruModule } from './guru/guru.module';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './common/cloudinary.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PrismaModule, CloudinaryModule, AuthModule, AdminModule, SiswaModule, GuruModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
