import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/registerDto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('test')
  test(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
