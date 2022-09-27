import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { Meetings } from './meetings.model';
import { MeetingsService } from './meetings.service';
import { MeetingsUpdateDto } from './meetingsUpdate.dto';

@Controller()
export class MeetingsController {
  constructor(private readonly meetingsService: MeetingsService) {}

  @Post('meetings')
  async createMeetings(@Body() meetingsDto: Meetings): Promise<Meetings> {
    try {
      return this.meetingsService.createMeetings(meetingsDto);
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
  @Get('meetings')
  async readMeetings(): Promise<Meetings[] | void> {
    try {
      return this.meetingsService.readMeetings();
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot get Meetings DB',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Get('meetings/:id')
  async readMeeting(@Param('id') id: ObjectId): Promise<Meetings> {
    try {
      return this.meetingsService.readMeeting(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot find Meeting ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Put('meetings/:id')
  async updateMeetings(@Param('id') id: ObjectId, @Body() updateData: MeetingsUpdateDto): Promise<Meetings> {
    try {
      return this.meetingsService.updateMeetings(id, updateData);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot update Meeting ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete('meetings/:id')
  async deleteMeetings(@Param('id') id: ObjectId): Promise<Meetings> {
    try {
      return this.meetingsService.deleteMeetings(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'Cannot delete Meeting ID',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
