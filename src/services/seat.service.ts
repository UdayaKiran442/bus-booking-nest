import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bus } from 'src/entities/bus.entity';
import { Seat } from 'src/entities/seat.entity';

import { SeatDTO } from 'src/dto/seat.dto';
import { Service } from 'src/entities/service.entity';

@Injectable()
export class SeatService {
  constructor(
    @InjectRepository(Bus) private busRepository: Repository<Bus>,
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  async addSeat(serviceNumber: string, seatDto: SeatDTO): Promise<Seat> {
    const service = await this.serviceRepository.findOneBy({ serviceNumber });
    if (!service) return null;
    const isSeat = await this.seatRepository.findOne({
      where: { service: { serviceNumber }, seatNumber: seatDto.seatNumber },
    });
    if (isSeat) throw new Error('Seat already added');
    const seat = new Seat();
    seat.seatNumber = seatDto.seatNumber;
    seat.seatType = seatDto.seatType;
    seat.service = service;
    seat.isAvailable = true;
    const newSeat = await this.seatRepository.save(seat);
    service.seats?.push(seat);
    await this.serviceRepository.save(service);
    return newSeat;
  }
}
