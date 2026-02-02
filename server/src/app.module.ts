import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { authFactory } from './auth/auth.factory';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BetterAuthModule.forRootAsync({
      imports: [PrismaModule],
      useFactory: (prisma: PrismaService, config: ConfigService) => {
        return {
          auth: authFactory.useFactory(prisma, config),
        };
      },
      inject: [PrismaService, ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
