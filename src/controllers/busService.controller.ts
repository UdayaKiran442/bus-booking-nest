import { Controller, Get } from '@nestjs/common';

import { BusServiceNumberService } from '../services/busService.service';

@Controller()
export class BusServiceNumberController {
  constructor(
    private readonly busServiceNumberService: BusServiceNumberService,
  ) {}

  @Get('/bus-service-number')
  getHello(): string {
    return this.busServiceNumberService.getHello();
  }
}
