import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from 'src/dto/user.dto';

import { User } from 'src/entities/user.entity';

import { UserService } from 'src/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/user/new-user')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response<User>> {
    const user = await this.userService.addUser(createUserDto);
    return res.json({
      message: 'Account created succesfully',
      user,
    });
  }
}
