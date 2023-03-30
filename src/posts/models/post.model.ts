import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { User } from 'src/users/models/user.model';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
  id: true,
})
@ObjectType({ description: 'blog posts' })
export class Post {
  @Field(() => ID)
  _id: mongoose.Types.ObjectId;

  @Field({ nullable: true })
  @Prop()
  title?: string;

  @Field({ nullable: true })
  @Prop()
  content?: string;

  @Field({ nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = mongoose.HydratedDocument<Post>;
