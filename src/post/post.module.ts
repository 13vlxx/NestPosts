import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.schema';
import { PostsRepository } from './posts.repository';
import { PostMapper } from './post.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  providers: [PostService, PostsRepository, PostMapper],
  controllers: [PostController],
})
export class PostModule {}
