import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/types/pagination-args';

@ArgsType()
export class GetPostsArgs extends PaginationArgs {
  @Field({ nullable: true })
  testArg?: string;
}
