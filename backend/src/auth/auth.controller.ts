import { Controller, Body, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignupDto } from '../users/dtos/signup.dto.js';
import { SigninDto } from '../users/dtos/signin.dto.js';
import type {  Response } from 'express';
import { Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  private setAuthCookie(response: Response, token: string) {
    response.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    });
  }

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signup(signupDto);
    this.setAuthCookie(response, result.accessToken);
    return {
      message: result.message,
      user: result.user,
    };
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @Body() signinDto: SigninDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.authService.signin(signinDto);

    this.setAuthCookie(response, result.accessToken);

    return {
      message: result.message,
      user: result.user,
    };
  }
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development' ? false : true,
      sameSite: 'lax',
    });

    return {
      message: 'Logged out successfully',
    };
  }
}
