import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from 'src/roles/role.enum';

export type UserDocument = User & Pick<Document, '_id' | '__v'>;

@Schema()
export class User {
  @Prop()
  id?: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  roles?: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
