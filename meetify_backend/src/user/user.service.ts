import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';
import { Role } from 'src/roles/role.enum';
import { User, UserDocument } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findOne(id: ObjectId): Promise<User> {
    const user = await this.userModel.findOne({ _id: id });
    if (!user) throw new NotFoundException();
    return user;
  }

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async readUsers() {
    const users = await this.userModel.find({}).exec();
    return users;
  }

  async readUser(id: ObjectId): Promise<User> {
    return this.userModel.findById(id);
  }

  async updateUser(id: ObjectId, data: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteUser(id: ObjectId) {
    return this.userModel.findByIdAndRemove(id);
  }
}
