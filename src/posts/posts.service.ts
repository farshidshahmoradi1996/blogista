import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getPaginationMetaData } from 'src/common/helpers/get-pagination-data.helper';

import { User } from 'src/users/models/user.model';
import { GetPostsArgs } from './dto/get-posts.args';
import { NewPostInput } from './dto/new-post.input';
import { PaginatedPost } from './dto/paginated-post.dto';
import { Post, PostDocument } from './models/post.model';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}
  async findAll(args: GetPostsArgs): Promise<PaginatedPost> {
    const { pageNumber, pageSize } = args;
    const skip = (pageNumber - 1) * pageSize;

    // query posts from db
    const query = this.postModel.find({}, {});

    // get pagination data
    const total = await query.clone().countDocuments();
    const pagination = getPaginationMetaData({
      pageNumber,
      pageSize,
      total,
    });

    // exec query
    const list = await query.limit(pageSize).skip(skip).populate('user');

    return {
      list,
      pagination,
    };
  }

  async createPost(postInput: NewPostInput, user: User): Promise<Post> {
    const post = new this.postModel({
      title: postInput.title,
      content: postInput.content,
      user: user._id,
    });
    await post.save();
    await post.populate('user');
    return post;
  }
}
