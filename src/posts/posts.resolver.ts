import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';

import { User } from 'src/users/models/user.model';
import { NewPostInput } from './dto/new-post.input';
import { PaginatedPost } from './dto/paginated-post.dto';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';
import { GetPostsArgs } from './dto/get-posts.args';

@Resolver()
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => PaginatedPost)
  posts(@Args() args: GetPostsArgs): Promise<PaginatedPost> {
    return this.postsService.findAll(args);
  }

  @Mutation(() => Post)
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('newPostInput') newPostInput: NewPostInput,
    @CurrentUser() user: User,
  ) {
    return this.postsService.createPost(newPostInput, user);
  }
}
