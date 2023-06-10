import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto, LoginUserDto } from 'src/dto/user.dto';
import { FromDestDTO } from 'src/dto/from-dest.dto';

import { User } from 'src/entities/user.entity';
import { Service } from 'src/entities/service.entity';

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
  @Post('/user/profile')
  async getProfile(@Request() req: any, @Res() res: Response) {
    const user = await this.userService.userProfile(req.user.id);
    return res.status(HttpStatus.FOUND).json({
      success: true,
      user,
    });
  }

  @Post('/bus/get-buses')
  async getBuses(
    @Body() fromDestDto: FromDestDTO,
    @Res() res: Response,
  ): Promise<Response<Service[]>> {
    const service = await this.userService.fetchBuses(
      fromDestDto.from,
      fromDestDto.dest,
    );
    return res.json({ service });
  }
}
