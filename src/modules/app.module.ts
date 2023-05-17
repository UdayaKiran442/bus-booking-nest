import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

import { BusServiceNumberModule } from './busService.module';

import { Service } from 'src/entities/service.entity';
import { Bus } from 'src/entities/bus.entity';
import { Seat } from 'src/entities/seat.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: 'nest-bus-booking',
      entities: [Service, Bus, Seat],
      synchronize: true,
    }),
    BusServiceNumberModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
