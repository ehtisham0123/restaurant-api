import { Body, Controller, Post, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { Request } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignupInput } from './dto/signup.input';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() signupInput: SignupInput) {
    signupInput.email = signupInput.email.toLowerCase();
    return await this.authService.createUser(signupInput);
  }

  @Post('login')
  async login(@Body() { email, password }: LoginInput) {
    return await this.authService.login(email.toLowerCase(), password);
  }

  @Post('refresh')
  async refreshToken(@Body() { token }: RefreshTokenInput) {
    return await this.authService.refreshToken(token);
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    const authHeader = req.headers.authorization;
    if (!authHeader) throw new UnauthorizedException('Authorization header is missing.');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Bearer token is missing.');

    return await this.authService.getUserFromToken(token);
  }
}