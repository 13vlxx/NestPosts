import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPostDto } from './dto/newPostDto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  //TODO fetch nombre de commentaire par post
  async fetchPosts() {
    return await this.prismaService.post.findMany({
      include: {
        user: {
          select: {
            userId: true,
            username: true,
            password: false,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                userId: true,
                username: true,
                password: false,
              },
            },
          },
        },
      },
    });
  }

  async newPost(userId: number, newPostDto: NewPostDto) {
    const { title, description } = newPostDto;
    await this.prismaService.post.create({
      data: { title, description, createdBy: userId },
    });
    return {
      status: 'ok',
      message: 'Post created successfully',
    };
  }

  async deletePost(userId: number, postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { postId },
    });
    if (!post) throw new NotFoundException('Post not found');
    if (post.createdBy != userId)
      throw new UnauthorizedException('Unauthorized, not your post');
    await this.prismaService.post.delete({ where: { postId } });
    return {
      status: 'ok',
      message: 'Post deleted successfully',
    };
  }
}
