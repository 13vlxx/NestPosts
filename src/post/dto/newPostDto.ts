import { IsNotEmpty } from 'class-validator';

export class NewPostDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly description: string;
}
