import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';

import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async addUser(createUserDto: CreateUserDto): Promise<User> {
    const encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    const isUserExist = await this.userRepository.findOneBy({
      email: createUserDto.email,
    });
    if (isUserExist) throw new Error('Email address already exists');
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;
    user.password = encryptedPassword;
    user.isAdmin = false;
    user.bookings = [];
    return await this.userRepository.save(user);
  }
}
