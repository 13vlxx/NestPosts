import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewCommentDto } from './dto/newCommentDto';
import { NewPostDto } from 'src/post/dto/newPostDto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async newComment(userId: number, newCommentDto: NewCommentDto) {
    const { content, postId } = newCommentDto;
    const post = await this.prismaService.post.findUnique({
      where: { postId },
    });
    if (!post) throw new NotFoundException('Post not found');
    const userAlreadyCommentedThat = await this.prismaService.comment.findFirst(
      {
        where: { content, postId, createdBy: userId },
      },
    );
    if (userAlreadyCommentedThat)
      throw new UnauthorizedException('You have already commented that');
    await this.prismaService.comment.create({
      data: { content, postId, createdBy: userId },
    });
    return {
      status: 'ok',
      message: 'Comment posted successfully',
    };
  }
}
