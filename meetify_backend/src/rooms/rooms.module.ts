import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsSchema } from './rooms.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'rooms', schema: RoomsSchema }])],
  providers: [RoomsService],
  controllers: [RoomsController],
})
export class RoomsModule {}
