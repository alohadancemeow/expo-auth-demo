import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpWithPasswordDto } from './dto/sign-up-with-password.dto';
import { SignInWithPasswordDto } from './dto/sign-in-with-password.dto';
import { AllowAnonymous, AuthGuard } from '@thallesp/nestjs-better-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @AllowAnonymous()
  @Post('signup')
  async signUpWithPassword(
    @Body() signUpWithPasswordDto: SignUpWithPasswordDto,
  ) {
    return this.authService.signUpWithPassword(signUpWithPasswordDto);
  }

  @AllowAnonymous()
  @Post('signin')
  async signInWithPassword(
    @Body() signInWithPasswordDto: SignInWithPasswordDto,
  ) {
    return this.authService.signInWithPassword(signInWithPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Post('signout')
  async signOut(@Req() req) {
    return this.authService.signOut(req.session.token);
  }
}
