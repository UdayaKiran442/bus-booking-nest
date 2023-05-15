import { Bus } from './bus.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @Column({ array: true })
  via: string[];

  @Column({ array: true })
  availableDays: string[];

  @OneToMany(() => Bus, (bus) => bus.service)
  buses: Bus[];
}
