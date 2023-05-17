import { Bus } from './bus.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  serviceNumber: string;

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
}
