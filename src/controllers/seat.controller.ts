import { Body, Controller, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { SeatDTO } from 'src/dto/seat.dto';

import { Seat } from 'src/entities/seat.entity';

import { SeatService } from 'src/services/seat.service';

@Controller()
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post('/seat/new-seat/:busId')
  async addSeat(
    @Param() param: any,
    @Body() seatDto: SeatDTO,
    @Res() res: Response,
  ): Promise<Response<Seat>> {
    const seat = await this.seatService.addSeat(param.busId, seatDto);
    if (!seat) return res.json({ error: 'Invalid bus id' });
    return res.json({ message: 'Seat added succesfully', seat });
  }
}
