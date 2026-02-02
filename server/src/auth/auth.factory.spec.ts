import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { authFactory } from './auth.factory';
import * as betterAuthModule from 'better-auth';

describe('authFactory', () => {
  let mockPrismaService: PrismaService;
  let mockConfigService: ConfigService;
  let betterAuthSpy: jest.SpyInstance;

  beforeEach(() => {
    mockPrismaService = {} as PrismaService;
    mockConfigService = {
      get: jest.fn((key: string) => {
        if (key === 'GOOGLE_CLIENT_ID') return 'test-client-id';
        if (key === 'GOOGLE_CLIENT_SECRET') return 'test-client-secret';
        return undefined;
      }),
    } as unknown as ConfigService;

    betterAuthSpy = jest.spyOn(betterAuthModule, 'betterAuth');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call betterAuth with secure: true in production environment', () => {
    process.env.NODE_ENV = 'production';
    authFactory.useFactory(mockPrismaService, mockConfigService);
    expect(betterAuthSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        secure: true,
      }),
    );
  });

  it('should call betterAuth with secure: false in non-production environment', () => {
    process.env.NODE_ENV = 'development';
    authFactory.useFactory(mockPrismaService, mockConfigService);
    expect(betterAuthSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        secure: false,
      }),
    );
  });
});
