import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';
import { Service } from './service.entity';

@Entity()
export class Bookings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  dateOfJourney: string;

  @Column()
  dayOfJourney: string;

  @Column('simple-json')
  passengers: {
    name: string;
    gender: string;
    seatNumber: number;
  }[];

  @ManyToOne(() => Service, (service) => service.bookings)
  service: Service;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
