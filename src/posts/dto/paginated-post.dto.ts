import { Post } from '../models/post.model';
import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/types/paginated';

@ObjectType()
export class PaginatedPost extends Paginated(Post) {}
