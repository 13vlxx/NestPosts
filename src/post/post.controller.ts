import {
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { NewPostDto } from './_utils/dto/requests/newPost.dto';
import { Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  fetchPosts() {
    return this.postService.fetchPosts();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post('new-post')
  newPost(@Req() request: Request, @Body() newPostDto: NewPostDto) {
    const userId = request.user['userId'];
    return this.postService.newPost(userId, newPostDto);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
  deletePost(
    @Param('id', ParseIntPipe) postId: number,
    @Req() request: Request,
  ) {
    const userId = request.user['userId'];
    return this.postService.deletePost(userId, postId);
  }
}
