import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(configService: ConfigService) {
    const adapter = new PrismaLibSql({
      url: configService.get('DATABASE_URL') ?? '',
      authToken: configService.get('DATABASE_AUTH_TOKEN'),
    });
    super({ adapter });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
