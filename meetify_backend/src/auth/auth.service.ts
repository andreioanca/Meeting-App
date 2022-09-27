import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { LoginOutput } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user): Promise<LoginOutput> {
    const userProfile = await this.usersService.getUserByEmail(user);

    return {
      access_token: this.jwtService.sign({ user: userProfile }, { expiresIn: '24h' }),
      name: userProfile.username,
      email: userProfile.email,
      roles: userProfile.roles,
      //@ts-ignore
      id: userProfile._id,
    };
  }
}
