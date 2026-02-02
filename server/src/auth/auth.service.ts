import { Injectable, Inject } from '@nestjs/common';
import { betterAuth } from 'better-auth';
import { toNodeHandler } from 'better-auth/node';
import { SignUpWithPasswordDto } from './dto/sign-up-with-password.dto';
import { SignInWithPasswordDto } from './dto/sign-in-with-password.dto';
import type { UserSession } from '@thallesp/nestjs-better-auth';

@Injectable()
export class AuthService {
  constructor(@Inject('BetterAuth') private readonly auth: ReturnType<typeof betterAuth>) { }

  async signUpWithPassword(signUpWithPasswordDto: SignUpWithPasswordDto) {
    return this.auth.api.signUpEmail({
      body: signUpWithPasswordDto
    });
  }

  async signInWithPassword(signInWithPasswordDto: SignInWithPasswordDto) {
    return this.auth.api.signInEmail({
      body: signInWithPasswordDto
    });
  }

  async signOut(sessionToken: string) {
    return this.auth.api.signOut({
      headers: new Headers({ "Authorization": `Bearer ${sessionToken}` })
    });
  }

  async getUser(session: UserSession) {
    return this.auth.api.getSession({
      headers: new Headers({ "Authorization": `Bearer ${session.session.token}` })
    });
  }
  
  get handler() {
    return toNodeHandler(this.auth);
  }
}
