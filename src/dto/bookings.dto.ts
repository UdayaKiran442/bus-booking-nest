export class BookingsDTO {
  from: string;
  to: string;
  dateOfJourney: string;
  dayOfJourney: string;
  busId: number;
  passengers: Passengers[];
}

export class BookedSeatsDTO {
  busId: number;
  dateOfJourney: string;
  dayOfJourney: string;
}

export interface Passengers {
  name: string;
  gender: string;
  row: number;
  column: number;
}
