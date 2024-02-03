import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NewCommentDto } from './dto/newCommentDto';

@Controller('comments')
export class CommentController {
  constructor(commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('new-comment')
  newComment(@Req() request: Request, @Body() newCommentDto: NewCommentDto) {
    return 'e';
  }
}
