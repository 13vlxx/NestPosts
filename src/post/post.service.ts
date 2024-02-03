import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewPostDto } from './dto/newPostDto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
