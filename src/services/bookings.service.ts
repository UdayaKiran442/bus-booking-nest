import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Bookings } from 'src/entities/bookings.entity';
import { Bus } from 'src/entities/bus.entity';
import { User } from 'src/entities/user.entity';

import { BookedSeatsDTO, BookingsDTO } from 'src/dto/bookings.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Bus) private busRepository: Repository<Bus>,
    @InjectRepository(Bookings)
    private bookingsRepository: Repository<Bookings>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async bookBus(userId: number, bookingsDto: BookingsDTO) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('User not found');
    const bus = await this.busRepository.findOneBy({ id: bookingsDto.busId });
    if (!bus) throw new NotFoundException('Bus not found');
    const newBooking = new Bookings();
    newBooking.from = bookingsDto.from;
    newBooking.to = bookingsDto.to;
    newBooking.dateOfJourney = bookingsDto.dateOfJourney;
    newBooking.dayOfJourney = bookingsDto.dayOfJourney;
    newBooking.bus = bus;
    newBooking.user = user;
    newBooking.passengers = bookingsDto.passengers;
    return await this.bookingsRepository.save(newBooking);
  }
  //   async getBookedSeatsOfTheBus(getBookedSeatsDTO: BookedSeatsDTO) {
  //     const bus = await this.busRepository.findOneBy({
  //       id: getBookedSeatsDTO.busId,
  //     });
  //     if (!bus) throw new NotFoundException('Bus not found');
  //     const booking = await this.bookingsRepository.findOneBy({
  //       bus: {
  //         id: bus.id,
  //       },
  //       dateOfJourney: getBookedSeatsDTO.dateOfJourney,
  //       dayOfJourney: getBookedSeatsDTO.dayOfJourney,
  //     });
  //     return booking.passengers;
  //   }
}
