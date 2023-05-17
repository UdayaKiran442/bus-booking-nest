export class BusServiceNumberDTO {
  serviceNumber: string;
  from: string;
  to: string;
  //   via: string[];
  //   availableDays: string[];
}

export class GetServiceNumberDetails {
  serviceNumber: string;
}

export class AddViaDTO {
  via: string;
}

export class AddAvailableDaysDTO {
  availableDays: string;
}
