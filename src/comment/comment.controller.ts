import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { NewCommentDto } from './dto/newComment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('new-comment')
  newComment(@Req() request: Request, @Body() newCommentDto: NewCommentDto) {
    const userId = request.user['userId'];
    return this.commentService.newComment(userId, newCommentDto);
  }
}
