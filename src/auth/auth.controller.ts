import { Body, Controller, Post, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('login')
  async login(@Body() { email, password }: LoginInput) {
    const { accessToken, refreshToken } = await this.authService.login(email.toLowerCase(), password);
    return { accessToken, refreshToken };
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
