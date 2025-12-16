import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { PrismaClient } from "../prisma/generated/prisma";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from 'path';

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'prisma/database.sqlite')}`,
});

const prisma = new PrismaClient({
  adapter,
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [expo()],
  socialProviders: {},
  trustedOrigins: [
    "myapp://",

    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(process.env.NODE_ENV === "development" ? [
      "exp://*/*",                 // Trust all Expo development URLs
      "exp://10.0.0.*:*/*",        // Trust 10.0.0.x IP range
      "exp://192.168.*.*:*/*",     // Trust 192.168.x.x IP range
      "exp://172.*.*.*:*/*",       // Trust 172.x.x.x IP range
      "exp://localhost:*/*"        // Trust localhost
    ] : [])
  ],
  logger: {
    log: (level, message, ...args) => {
      console.log(`${level}: ${message}`);
      console.log(JSON.stringify(args, null, 2));
    },
  },
});
