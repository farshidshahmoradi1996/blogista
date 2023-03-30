import { Field, InputType } from '@nestjs/graphql';
import { Length, IsEmail } from 'class-validator';

@InputType()
export class NewUserInput {
  @Field()
  @Length(1, 100)
  name: string;

  @Field({ nullable: false })
  @Length(0, 100)
  @IsEmail()
  email: string;

  @Field({ nullable: false })
  @Length(0, 100)
  password: string;
}
