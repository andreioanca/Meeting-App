import { IsNumber, IsString } from 'class-validator';
import { RoomsDocument } from './rooms.model';

export class RoomsUpdateDto {
  @IsString()
  name: string;
  @IsNumber()
  capacity: number;

  static getFromRoom(room: RoomsDocument): RoomsUpdateDto {
    const roomDto = new RoomsUpdateDto();
    roomDto.name = room.name;
    roomDto.capacity = room.capacity;
    return roomDto;
  }
}
