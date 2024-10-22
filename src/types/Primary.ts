import { Energy, Freight, Fuel, Heat, Hotel, Refrigerant, Travel } from './Secondary';

export interface CompanyData {
  _id?: string;
  companyName?: string;
  numEmployees?: number;
  annualSales?: number;
  annualGrowth?: number;
  reportTitle?: string;
  observationPeriod?: string;
  observationEnd?: string;
  observationObject?: string;
  description?: string;
  region?: string;
}

export interface UserData {
  _id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  imageUrl?: string;
  status?: string;
  role_type?: string;
  role?: string;
  company?: {
    _id: string;
    companyName: string;
  };
}

export interface Scope {
  company: string;
  //sacar {Scope:number} de Scope
  scope: number;
  type: string;
  amount: number;
  unit_type: string;
  region: string;
  year: string;
  co2e: number;
  co2e_unit: string;
  total: number;
}

export interface Scope1 extends Scope {
  energy?: Energy;
  heat?: Heat;
  fuel?: Fuel;
  freight?: Freight;
  travel?: Travel;
  refrigerant?: Refrigerant;
}

export interface Scope2 extends Scope {
  energy?: Energy;
  heat?: Heat;
  fuel?: Fuel;
}
export interface Scope3 extends Scope {
  source?: string;
  source_dataset?: string;
  energy?: Energy;
  heat?: Heat;
  fuel?: Fuel;
  freight?: Freight;
  travel?: Travel;
  hotel?: Hotel;
}

export type Scopes = Array<Scope1 & Scope2 & Scope3>;
export interface Routes {
  checked: boolean;
  amount: number;
  transport_type: string;
  type: string;
  unit_type: string;
  start: string;
  final: string;
  km: number;
  totalCo2: number;
}
