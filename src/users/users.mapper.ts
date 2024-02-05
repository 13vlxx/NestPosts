import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUserDto } from './_utils/dto/responses/get-user.dto';

@Injectable()
export class UsersMapper {
  toGetUsersDtoArray = (users: User[]): GetUserDto[] => {
    return users.map((user) => this.toGetUserDto(user));
  };

  toGetUserDto = (user: User): GetUserDto => ({
    userId: user.userId,
    email: user.email,
    username: user.username,
  });
}
