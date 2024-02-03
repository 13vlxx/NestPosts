import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}
  async register(registerDto: RegisterDto) {
    const { email, username, password } = registerDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (user) throw new ConflictException('Account already exists');
    const hash = await bcrypt.hash(password, 10);
    await this.prismaService.user.create({
      data: { email, username, password: hash },
    });
    return {
      status: 'ok',
      message: 'Account created successfully',
    };
  }
}
