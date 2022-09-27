import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Rooms, RoomsDocument } from './rooms.model';
import { Model } from 'mongoose';
import { ObjectId } from 'mongoose';

@Injectable()
export class RoomsService {
  constructor(@InjectModel('rooms') private readonly roomsModel: Model<RoomsDocument>) {}

  async createRooms(rooms: Rooms): Promise<Rooms> {
    const newRooms = new this.roomsModel(rooms);
    return newRooms.save();
  }

  async readRooms(): Promise<Rooms[]> {
    const rooms = await this.roomsModel.find({}).exec();
    return rooms;
  }

  async readRoom(id: ObjectId): Promise<Rooms> {
    return this.roomsModel.findById(id);
  }

  async updateRooms(id, data): Promise<Rooms> {
    return this.roomsModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRooms(id) {
    return this.roomsModel.findByIdAndRemove(id);
  }
}
