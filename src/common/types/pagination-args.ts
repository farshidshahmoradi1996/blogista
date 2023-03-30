import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field({ nullable: true, defaultValue: 10 })
  @IsNumber()
  pageSize?: number;

  @Field({ nullable: true, defaultValue: 1 })
  @IsNumber()
  pageNumber?: number;
}
