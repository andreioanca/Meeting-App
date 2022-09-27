import { IsString } from 'class-validator';
import { UserDocument } from './user.model';

export class UserUpdateDto {
  @IsString()
  username: string;
  @IsString()
  email: string;
  @IsString()
  roles: string;

  static getFromUser(user: UserDocument): UserUpdateDto {
    const userDto = new UserUpdateDto();
    userDto.username = user.username;
    userDto.email = user.email;
    userDto.roles = user.roles;
    return userDto;
  }
}
