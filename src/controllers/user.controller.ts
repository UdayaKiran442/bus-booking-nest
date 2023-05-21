import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';

import { User } from 'src/entities/user.entity';

import { UserService } from 'src/services/user.service';

import { AuthGaurd } from 'src/auth-gaurd/auth.gaurd';
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
  @Post('/user/login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ): Promise<Response<User>> {
    const token = await this.userService.signInUser(
      loginUserDto.email,
      loginUserDto.password,
    );
    return res.json({ message: 'Login succesfull', token });
  }

  @UseGuards(AuthGaurd)
  @Get('/user/profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
