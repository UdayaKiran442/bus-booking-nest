import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Bus } from './bus.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  column: number;

  @Column()
  isAvailable: boolean;

  @Column({ enum: ['window', 'aisel'] })
  seatType: string;

  @ManyToOne(() => Bus, (bus) => bus.seats)
  bus: Bus;
}
