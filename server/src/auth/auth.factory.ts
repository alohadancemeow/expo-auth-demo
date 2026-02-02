import { FactoryProvider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { PrismaService } from '../prisma/prisma.service';
import { bearer } from 'better-auth/plugins';
import { expo } from "@better-auth/expo";

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
          prompt: "select_account",
          clientId: configService.get<string>("GOOGLE_CLIENT_ID")!,
          clientSecret: configService.get<string>("GOOGLE_CLIENT_SECRET")!,
        },
        github: {
          clientId: configService.get<string>("GITHUB_CLIENT_ID")!,
          clientSecret: configService.get<string>("GITHUB_CLIENT_SECRET")!,
        }
      },
      secret: configService.get<string>('BETTER_AUTH_SECRET'),
      baseURL: configService.get<string>('BETTER_AUTH_URL'),
      secure: process.env.NODE_ENV === "production",
      plugins: [
        bearer(), // Add bearer plugin
        expo()
      ],

      trustedOrigins: [
        "myapp://",          // Expo deep link
        "http://localhost:8081", // Expo dev
        "exp://",
        "https://nontolerant-gena-cynically.ngrok-free.dev", // ngrok

        // Development mode - Expo's exp:// scheme with local IP ranges
        ...(process.env.NODE_ENV === "development" ? [
          "exp://",                      // Trust all Expo URLs (prefix matching)
          "exp://**",                    // Trust all Expo URLs (wildcard matching)
          "exp://192.168.*.*:*/**",      // Trust 192.168.x.x IP range with any port and path
        ] : [])

      ],
    });
  },
  inject: [PrismaService, ConfigService],
};
