import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength, MinLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @Field()
  @Length(2, 30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @MinLength(10)
  content?: string;
}
