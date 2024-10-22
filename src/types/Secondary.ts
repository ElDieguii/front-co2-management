import { Air, Sea, Road, Rail, TravelAir, TravelCar } from './Tertiary';

export interface Energy {
  energy_source?: string;
  connection?: string;
}

export interface Heat {
  energy_source?: string;
  loss_factor?: string;
}

export interface Fuel {
  fuel_type?: string;
}

export interface Freight {
  distance?: number;
  start_location?: string;
  transport_type?: string;
  end_location?: string;
  air?: Air;
  sea?: Sea;
  road?: Road;
  rail?: Rail;
}

interface Distance {
  distance_km?: number;
  start_location?: string;
  travel_mode?: string;
  final_destination?: string;
  air?: TravelAir;
  car?: TravelCar;
}
interface Expenditure {
  currency_type?: string;
  spend_type?: string;
  final_destination?: string;
}

export interface Travel {
  distance?: Distance;
  expenditure?: Expenditure;
}

export interface Refrigerant {
  emittent?: string;
  unit_type?: string;
  source?: string;
  source_dataset?: string;
  sector?: string;
  description?: string;
}

export interface Hotel {
  hotel_nights: number;
  hotel_name: string;
  hotel_location: string;
  hotel_emission: number;
  hotel_emission_unit: string;
}
