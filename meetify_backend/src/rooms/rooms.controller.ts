import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { RoomsService } from './rooms.service';
import { Rooms } from './rooms.model';
import { RoomsUpdateDto } from './roomUpdate.dto';

@Controller()
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Post('rooms')
  async createRooms(@Body() roomsDto: Rooms): Promise<Rooms> {
    try {
      return this.roomsService.createRooms(roomsDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot send data to DB',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('rooms')
  async readRooms(): Promise<Rooms[]> {
    try {
      return this.roomsService.readRooms();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot find Rooms DB',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('rooms/:id')
  async readRoom(@Param('id') id: ObjectId): Promise<Rooms> {
    try {
      return this.roomsService.readRoom(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot find Room ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Put('rooms/:id')
  async updateRooms(@Param('id') id: ObjectId, @Body() updateData: RoomsUpdateDto): Promise<Rooms> {
    try {
      return this.roomsService.updateRooms(id, updateData);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot update Room ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete('rooms/:id')
  async deleteRooms(@Param('id') id: ObjectId) {
    try {
      return this.roomsService.deleteRooms(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot delete Room ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
