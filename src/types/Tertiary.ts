export interface Air {
  aircraft_type: string;
  methodology: string;
  radiative_forcing_index: string;
}

export interface Sea {
  vessel_type: string;
  tonnage: string;
  fuel_source: string;
  load_type: string;
}

export interface Road {
  vehicle_type: string;
  fuel_source: string;
  vehicle_weight: string;
  load_type: string;
}

export interface Rail {
  fuel_type: string;
  load_type: string;
}

export interface TravelAir {
  class: string;
}
export interface TravelCar {
  car_size: string;
  car_type: string;
}
