import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { BusServiceNumberService } from '../services/busService.service';
import {
  AddAvailableDaysDTO,
  AddViaDTO,
  BusServiceNumberDTO,
} from 'src/dto/busServiceNumber.dto';
import { Service } from 'src/entities/service.entity';

@Controller()
export class BusServiceNumberController {
  constructor(
    private readonly busServiceNumberService: BusServiceNumberService,
  ) {}

  @Get('/bus-service-number')
  getHello(): string {
    return this.busServiceNumberService.getHello();
  }

  @Get('/service-number-details/:number')
  async getServiceNumberDetails(
    @Res() res: Response,
    @Param() params: any,
  ): Promise<Response<Service>> {
    const service =
      await this.busServiceNumberService.getDetailsByServiceNumber(
        params.number,
      );
    if (service) {
      return res.status(HttpStatus.FOUND).json({ service });
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Service not found' });
    }
  }

  @Post('/add/new-service')
  async addService(
    @Res() res: Response,
    @Body() busServiceNumberDTO: BusServiceNumberDTO,
  ): Promise<Response<Service>> {
    const newService = await this.busServiceNumberService.addService(
      busServiceNumberDTO,
    );
    if (newService) {
      return res.status(HttpStatus.CREATED).json({ newService });
    } else {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'Service number already exists' });
    }
  }
  @Post('/service/add-via-route/:number')
  async addVia(
    @Res() res: Response,
    @Body() addViaDto: AddViaDTO,
    @Param() param: any,
  ): Promise<Response<Service>> {
    const service = await this.busServiceNumberService.addViaRoute(
      param.number,
      addViaDto,
    );
    if (!service) return res.json({ error: 'Invalid service number' });
    return res.json({
      message: 'Via route added',
      service,
    });
  }
  @Post('/service/add-available/:number')
  async addAvailable(
    @Res() res: Response,
    @Body() addAvailableDto: AddAvailableDaysDTO,
    @Param() param: any,
  ): Promise<Response<Service>> {
    const service = await this.busServiceNumberService.addAvailableDays(
      param.number,
      addAvailableDto,
    );
    if (!service) return res.json({ error: 'Invalid service number' });
    return res.json({
      message: 'Available days added',
      service,
    });
  }
}
