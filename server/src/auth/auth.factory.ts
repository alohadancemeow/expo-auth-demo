import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { PrismaService } from '../prisma/prisma.service';
import { bearer } from 'better-auth/plugins';

export const authFactory: FactoryProvider<ReturnType<typeof betterAuth>> = {
  provide: 'BetterAuth',
  useFactory: (prisma: PrismaService, configService: ConfigService) => {
    return betterAuth({
      database: prismaAdapter(prisma, {
        provider: 'sqlite',
      }),
      emailAndPassword: {
        enabled: true,
      },
      socialProviders: {
        google: {
          clientId: configService.get<string>("GOOGLE_CLIENT_ID")!,
          clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET")!,
        }
      },
      secret: configService.get<string>('BETTER_AUTH_SECRET'),
      baseURL: configService.get<string>('BETTER_AUTH_URL'),
      secure: process.env.NODE_ENV === "production",
      plugins: [
        bearer() // Add bearer plugin
      ]
    });
  },
  inject: [PrismaService, ConfigService],
};
