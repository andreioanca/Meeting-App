import { Controller, Get, Post, UseGuards, Request, HttpStatus, HttpException, Body } from '@nestjs/common';
import { LoginOutput } from './auth/auth.interface';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guards';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { User } from './user/user.model';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body('email') req): Promise<LoginOutput> {
    try {
      return this.authService.login(req);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot find email',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req): Promise<User> {
    try {
      return req.user;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot return User',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('admin')
  @UseGuards(JwtAuthGuard)
  create(@Request() req): Promise<User> {
    try {
      return req.user;
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot return User',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
