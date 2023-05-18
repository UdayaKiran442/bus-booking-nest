import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bus } from 'src/entities/bus.entity';
import { Seat } from 'src/entities/seat.entity';

import { SeatDTO } from 'src/dto/seat.dto';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Bus) private busRepository: Repository<Bus>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async addSeat(id: number, seatDto: SeatDTO): Promise<Seat> {
    const bus = await this.busRepository.findOneBy({ id });
    if (!bus) return null;
    const isSeat = await this.seatRepository.findOne({
      where: { bus: { id }, row: seatDto.row, column: seatDto.column },
    });
    if (isSeat) throw new Error('Seat already added');
    const seat = new Seat();
    seat.row = seatDto.row;
    seat.column = seatDto.column;
    seat.seatType = seatDto.seatType;
    seat.bus = bus;
    seat.isAvailable = true;
    const newSeat = await this.seatRepository.save(seat);
    bus.seats?.push(seat);
    await this.busRepository.save(bus);
    return newSeat;
  }
}
