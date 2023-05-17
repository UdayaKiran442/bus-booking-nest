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
    if (isServiceNumber) return null;
    // this.serviceRepository.create(busServiceNumberDTO);
    // return await this.serviceRepository.save(busServiceNumberDTO);
    const newService = new Service();
    newService.serviceNumber = busServiceNumberDTO.serviceNumber;
    newService.from = busServiceNumberDTO.from;
    newService.to = busServiceNumberDTO.to;
    newService.availableDays = [];
    newService.via = [];
    newService.buses = [];
    return await this.serviceRepository.save(newService);
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
