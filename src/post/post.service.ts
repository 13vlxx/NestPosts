import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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
}
