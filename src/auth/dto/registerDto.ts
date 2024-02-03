import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly username: string;
  @IsNotEmpty()
  readonly password: string;
}
