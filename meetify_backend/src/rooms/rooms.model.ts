import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RoomStatus } from './rooms.enum';

export type RoomsDocument = Rooms & Document;

@Schema()
export class Rooms {
  @Prop()
  id?: string;

  @Prop()
  name: string;

  @Prop()
  capacity: number;
}

export const RoomsSchema = SchemaFactory.createForClass(Rooms);
