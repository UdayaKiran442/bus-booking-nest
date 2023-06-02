import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { Bookings } from './bookings.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  // @Column('simple-array', { default: () => 'ARRAY[]::varchar[]' })
  // bookings: [];

  @OneToMany(() => Bookings, (bookings) => bookings.user)
  bookings: Bookings[];
}
