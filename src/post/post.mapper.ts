import { Injectable } from '@nestjs/common';
import { Post } from './post.schema';
import { GetPostDto } from './_utils/dto/responses/get-post.dto';

@Injectable()
export class PostMapper {
  toGetPostDto = (post: Post): GetPostDto => ({
    title: post.title,
    description: post.description,
  });
}
