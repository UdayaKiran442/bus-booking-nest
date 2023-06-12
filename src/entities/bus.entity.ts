import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Service } from './service.entity';

@Entity()
export class Bus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  busType: string;

  @Column()
  numberPlate: string;

  @ManyToOne(() => Service, (service) => service.buses)
  service: Service;
}
