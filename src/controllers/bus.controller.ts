import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Res,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Response } from 'express';

import { AuthGaurd } from 'src/auth-gaurd/auth.gaurd';

import { AddBusDTO } from 'src/dto/bus.dto';

import { Bus } from 'src/entities/bus.entity';

import { BusService } from 'src/services/bus.service';

@Controller()
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Get('/bus/:id')
  async getBusById(
    @Param() param: any,
    @Res() res: Response,
  ): Promise<Response<Bus>> {
    const bus = await this.busService.getBusesById(param.id);
    if (!bus) return res.status(HttpStatus.NOT_FOUND).json({ bus });
    return res.status(HttpStatus.FOUND).json({ bus });
  }

  @UseGuards(AuthGaurd)
  @Post('/bus/new-bus')
  async addBus(
    @Body() addBusDto: AddBusDTO,
    @Res() res: Response,
    @Request() req: any,
  ): Promise<Response<Bus>> {
    const { user } = req;
    if (!user.isAdmin) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ error: 'Unauthorized access' });
    }
    const newBus = await this.busService.addBus(addBusDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Bus created',
      newBus,
    });
  }
}
