import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { User } from 'src/entities/user.entity';
import { Service } from 'src/entities/service.entity';

import { UserService } from 'src/services/user.service';

import { UserController } from 'src/controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Service]),
    ConfigModule.forRoot({}),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
