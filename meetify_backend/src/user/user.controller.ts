import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { UserService } from './user.service';
import { User } from './user.model';
import { UserUpdateDto } from './userUpdateDto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { LocalAuthGuard } from 'src/auth/local-auth.guards';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(LocalAuthGuard)
  @Post('user')
  async createUser(@Body() userDto: User) {
    try {
      const user = await this.userService.createUser(userDto);
      return UserUpdateDto.getFromUser(user);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot create User',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user')
  readUsers() {
    return this.userService.readUsers();
  }

  // @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  async readUser(@Param('id') id: ObjectId) {
    try {
      const user = await this.userService.readUser(id);
      return UserUpdateDto.getFromUser(user);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot find ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Put('user/:id')
  async updateUser(@Param('id') id: ObjectId, @Body() updateData: UserUpdateDto): Promise<User> {
    try {
      return this.userService.updateUser(id, updateData);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot update User',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
  // @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  async deleteUser(@Param('id') id: ObjectId) {
    try {
      return this.userService.deleteUser(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot delete ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
