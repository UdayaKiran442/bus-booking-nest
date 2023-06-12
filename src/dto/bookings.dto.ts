export class BookingsDTO {
  from: string;
  to: string;
  dateOfJourney: string;
  dayOfJourney: string;
  serviceNumber: string;
  passengers: Passengers[];
}

export class BookedSeatsDTO {
  serviceNumber: string;
  dateOfJourney: string;
  dayOfJourney: string;
}

export interface Passengers {
  name: string;
  gender: string;
  seatNumber: number;
}
