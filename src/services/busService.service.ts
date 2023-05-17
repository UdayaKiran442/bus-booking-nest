import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from 'src/entities/service.entity';

import { BusServiceNumberDTO } from 'src/dto/busServiceNumber.dto';

@Injectable()
export class BusServiceNumberService {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}
  getHello(): string {
    return 'Hello from busService';
  }

  async addService(
    busServiceNumberDTO: BusServiceNumberDTO,
  ): Promise<Service | null> {
    const isServiceNumber = await this.serviceRepository.findOneBy({
      serviceNumber: busServiceNumberDTO.serviceNumber,
    });
    if (isServiceNumber) {
      return null;
    } else {
      const newServiceNumber =
        this.serviceRepository.create(busServiceNumberDTO);
      newServiceNumber.buses = [];
      return await this.serviceRepository.save(busServiceNumberDTO);
    }
  }

  async getDetailsByServiceNumber(serviceNumber: string) {
    const service = await this.serviceRepository.findOneBy({ serviceNumber });
    if (service) {
      return service;
    } else {
      return null;
    }
  }
}
