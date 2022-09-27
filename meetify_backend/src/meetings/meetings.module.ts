import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MeetingsService } from './meetings.service';
import { MeetingsController } from './meetings.controller';
import { MeetingsSchema } from './meetings.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'meetings', schema: MeetingsSchema }])],
  providers: [MeetingsService],
  controllers: [MeetingsController],
})
export class MeetingsModule {}
