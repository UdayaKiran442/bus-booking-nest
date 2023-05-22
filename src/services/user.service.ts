import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from 'src/entities/user.entity';
import { Service } from 'src/entities/service.entity';

import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
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

  async signInUser(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) throw new Error('Invalid email');
    const decryptedPassword = bcrypt.compare(password, user.password);
    if (!decryptedPassword) throw new Error('Invalid password');
    const payload = {
      name: user.name,
      email: user.email,
      id: user.id,
      isAdmin: user.isAdmin,
    };
    const token = this.jwtService.sign(payload);
    return token;
  }

  async fetchBuses(from: string, dest: string): Promise<Service[]> {
    const services: Service[] = [];
    const service = await this.serviceRepository.findBy({
      from,
    });
    service.map((s) => {
      s.via.includes(dest) && services.push(s);
      s.to === dest && services.push(s);
    });
    return services;
  }
}
