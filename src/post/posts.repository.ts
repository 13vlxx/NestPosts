import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.schema';
import { Repository } from 'typeorm';
import { NewPostDto } from './_utils/dto/requests/newPost.dto';

export class PostsRepository {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  findAll = () => this.postsRepository.find();

  findById = (postId: number) =>
    this.postsRepository.findOneByOrFail({ postId });

  create = (newPost: NewPostDto) =>
    this.postsRepository.save({
      title: newPost.title,
      description: newPost.description,
    });

  delete = (postId: number) => this.postsRepository.delete({ postId });
}
