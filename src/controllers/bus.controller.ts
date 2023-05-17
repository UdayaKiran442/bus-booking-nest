import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { AddBusDTO } from 'src/dto/bus.dto';

import { Bus } from 'src/entities/bus.entity';

import { BusService } from 'src/services/bus.service';

@Controller()
export class BusController {
  constructor(private readonly busService: BusService) {}

  @Post('/bus/new-bus')
  async addBus(
    @Body() addBusDto: AddBusDTO,
    @Res() res: Response,
  ): Promise<Response<Bus>> {
    const newBus = await this.busService.addBus(addBusDto);
    return res.status(HttpStatus.CREATED).json({
      message: 'Bus created',
      newBus,
    });
  }
}
