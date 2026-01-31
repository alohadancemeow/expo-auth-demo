import "dotenv/config";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { PrismaClient } from "@/prisma/generated/prisma/edge";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL as string,
  authToken: process.env.DATABASE_AUTH_TOKEN as string | undefined,
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
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [expo()],
  trustedOrigins: [
    "myapp://",

    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(process.env.NODE_ENV === "development" ? [
      "exp://*/*",                 // Trust all Expo development URLs
      "exp://10.0.0.*:*/*",        // Trust 10.0.0.x IP range
      "exp://192.168.*.*:*/*",     // Trust 192.168.x.x IP range
      "exp://172.*.*.*:*/*",       // Trust 172.x.x.x IP range
      "exp://localhost:*/*",        // Trust localhost
      "http://localhost:8081",
      "http://10.0.0.*:8081",
      "http://192.168.*.*:8081",
      "http://172.*.*.*:8081",
    ] : [])
  ],
  logger: {
    log: (level, message, ...args) => {
      console.log(`${level}: ${message}`);
      console.log(JSON.stringify(args, null, 2));
    },
  },
});
