import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from 'src/entities/service.entity';

import {
  AddAvailableDaysDTO,
  AddViaDTO,
  BusServiceNumberDTO,
} from 'src/dto/busServiceNumber.dto';

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
    newService.availableDays = busServiceNumberDTO.availableDays;
    newService.via = [];
    newService.buses = [];
    return await this.serviceRepository.save(newService);
  }

  async getDetailsByServiceNumber(serviceNumber: string) {
    const service = await this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.buses', 'bus')
      .where('service.serviceNumber = :serviceNumber', { serviceNumber })
      .getOne();
    if (service) {
      return service;
    } else {
      return null;
    }
  }

  async addViaRoute(serviceNumber: string, addViaDto: AddViaDTO) {
    const service = await this.serviceRepository.findOneBy({ serviceNumber });
    if (!service) return null;
    service.via.push(addViaDto.via);
    this.serviceRepository.save(service);
    return service;
  }

  async addAvailableDays(
    serviceNumber: string,
    addAvailableDto: AddAvailableDaysDTO,
  ) {
    const service = await this.serviceRepository.findOneBy({ serviceNumber });
    if (!service) return null;
    service?.availableDays?.push(addAvailableDto.availableDays);
    this.serviceRepository.save(service);
    return service;
  }
}
