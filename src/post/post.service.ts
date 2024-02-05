import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPostDto } from './_utils/dto/requests/newPost.dto';
import { PostsRepository } from './posts.repository';
import { PostMapper } from './post.mapper';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly postsRepository: PostsRepository,
    private readonly postMapper: PostMapper,
  ) {}

  async fetchPosts() {
    return await this.postsRepository.findAll();
  }

  async newPost(userId: number, newPostDto: NewPostDto) {
    const post = await this.postsRepository.create(newPostDto);
    return {
      post: this.postMapper.toGetPostDto(post),
    };
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.postsRepository.findById(postId);
    if (!post) throw new NotFoundException('Post not found');
    await this.postsRepository.delete(post.postId);
    return {
      deletedPost: post,
    };
  }
}
