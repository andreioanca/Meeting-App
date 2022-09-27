import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MaxDate, MinDate } from 'class-validator';
import mongoose, { Document } from 'mongoose';
import { Rooms } from 'src/rooms/rooms.model';
import { User } from 'src/user/user.model';

export type MeetingsDocument = Meetings & Document;

@Schema()
export class Meetings {
  @Prop()
  id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  owner?: User;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'rooms' })
  room: Rooms;

  @Prop()
  name: string;

  @Prop()
  @MinDate(new Date('1/01/2022'))
  startTime: Date;

  @Prop()
  @MaxDate(new Date('1/01/2024'))
  endTime: Date;

  @Prop({ required: true, type: [mongoose.Schema.Types.ObjectId], ref: 'user' })
  members: User[];
}

export const MeetingsSchema = SchemaFactory.createForClass(Meetings);
