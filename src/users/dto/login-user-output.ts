import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../models/user.model';

@ObjectType()
export class LoginUserOutput {
  @Field({ nullable: false })
  user: User;

  @Field({ nullable: false })
  token: string;
}
