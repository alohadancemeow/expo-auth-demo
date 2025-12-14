import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { expo } from "@better-auth/expo";
import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import path from 'path';

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'prisma/database.sqlite')}`
})

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
  trustedOrigins: ["exp://", "withbetterauth://", "myapp://"],
  logger: {
    log: (level, message, ...args) => {
      console.log(`${level}: ${message}`);
      console.log(JSON.stringify(args, null, 2));
    },
  },
});
