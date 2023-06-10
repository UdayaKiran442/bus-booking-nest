import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Service } from './service.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatNumber: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ enum: ['window', 'aisel'] })
  seatType: string;

  @ManyToOne(() => Service, (service) => service.seats)
  service: Service;
}
