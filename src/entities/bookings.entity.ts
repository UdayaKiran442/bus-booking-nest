import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Bus } from './bus.entity';
import { User } from './user.entity';

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

  @ManyToOne(() => Bus, (bus) => bus.bookings)
  bus: Bus;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;
}
