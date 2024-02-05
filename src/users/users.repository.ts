import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.schema';
import { Repository } from 'typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';

export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll = () => this.usersRepository.find();

  create = (registerDto: RegisterDto) =>
    this.usersRepository.save({
      email: registerDto.email,
      username: registerDto.username,
      password: registerDto.password,
    });

  findById = (id: number) =>
    this.usersRepository.findOneByOrFail({ userId: id });

  findByEmail = (email: string) =>
    this.usersRepository.findOneByOrFail({ email });

  delete = (id: number) => this.usersRepository.delete({ userId: id });
}
