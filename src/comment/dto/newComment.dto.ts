import { IsNotEmpty } from 'class-validator';

export class NewCommentDto {
  @IsNotEmpty()
  readonly content: string;
  @IsNotEmpty()
  readonly postId: number;
}
