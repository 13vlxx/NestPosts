import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import { DeleteAccountDto } from './dto/deleteAccountDto';
import { ChangePasswordDto } from './dto/changePasswordDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('change-password')
  changePassword(
    @Req() request: Request,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const userId = request.user['userId'];
    return this.authService.changePassword(userId, changePasswordDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('delete')
  deleteAccount(
    @Req() request: Request,
    @Body() deleteAccountDto: DeleteAccountDto,
  ) {
    const userId = request.user['userId'];
    return this.authService.deleteAccount(userId, deleteAccountDto);
  }
}
