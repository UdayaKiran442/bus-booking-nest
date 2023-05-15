import { Injectable } from '@nestjs/common';

@Injectable()
export class BusServiceNumberService {
  getHello(): string {
    return 'Hello from busService';
  }
}
