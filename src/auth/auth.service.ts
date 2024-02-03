import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/loginDto';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { DeleteAccountDto } from './dto/deleteAccountDto';
import { ChangePasswordDto } from './dto/changePasswordDto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

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

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new NotFoundException('User not found');
    const arePasswordMatching = await bcrypt.compare(password, user.password);
    if (!arePasswordMatching)
      throw new UnauthorizedException("Password doesn't match");

    const payload = {
      subscriber: user.userId,
      email: user.email,
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: '1d',
      secret: this.configService.get('SECRET_KEY'),
    });

    return {
      status: 'ok',
      body: {
        userId: user.userId,
        token,
      },
    };
  }

  async deleteAccount(userId: number, deleteAccountDto: DeleteAccountDto) {
    const { password } = deleteAccountDto;
    const user = await this.prismaService.user.findUnique({
      where: { userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const arePasswordMatching = await bcrypt.compare(password, user.password);
    if (!arePasswordMatching)
      throw new UnauthorizedException("Password doesn't match");
    await this.prismaService.user.delete({ where: { userId } });
    return {
      status: 'ok',
      message: 'User successfully deleted',
    };
  }

  async changePassword(userId: number, changePasswordDto: ChangePasswordDto) {
    const { password } = changePasswordDto;
    const user = await this.prismaService.user.findUnique({
      where: { userId },
    });
    if (!user) throw new NotFoundException('User not found');
    const hash = await bcrypt.hash(password, 10);
    await this.prismaService.user.update({
      where: { userId },
      data: {
        password: hash,
      },
    });
    return {
      status: 'ok',
      message: 'password updated successfully',
    };
  }
}
