import { Bus } from './bus.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Seat } from './seat.entity';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceNumber: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  departureTime: string;

  @Column()
  arrivalTime: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column('simple-array', { default: () => 'ARRAY[]::varchar[]' })
  via: string[];

  @Column('simple-array', { default: () => 'ARRAY[]::varchar[]' })
  availableDays: string[];

  @OneToMany(() => Bus, (bus) => bus.service)
  buses: Bus[];

  @OneToMany(() => Seat, (seat) => seat.service)
  seats: Seat[];
}
