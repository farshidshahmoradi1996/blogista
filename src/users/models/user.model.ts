import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true, id: true })
@ObjectType({ description: 'user model' })
export class User {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field()
  @Prop()
  name?: string;

  @Field()
  @Prop()
  email: string;

  @Prop()
  password: string;
}

export type UserDocument = mongoose.HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);
