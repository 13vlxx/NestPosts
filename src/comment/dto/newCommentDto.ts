import { IsNotEmpty } from 'class-validator';

export class NewCommentDto {
  @IsNotEmpty()
  readonly content: string;
}
