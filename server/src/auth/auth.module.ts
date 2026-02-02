import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { authFactory } from './auth.factory';

@Module({
  imports: [PrismaModule],
  controllers: [AuthController],
  providers: [authFactory, AuthService],
  exports: [AuthService],
})
export class AuthModule { }
