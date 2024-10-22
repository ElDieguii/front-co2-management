import { CompanyData, Routes, Scope, Scope1, Scope2 } from '../types/Primary';
import { FuelTypeByCategory } from './ClimatiQ';

export const initialScope: Scope & Scope1 & Scope2 = {
  company: '',
  scope: 0,
  type: '',
  amount: 0,
  unit_type: '',
  region: '',
  year: '',
  co2e: 0,
  co2e_unit: '',
  total: 0,
  energy: undefined,
  heat: undefined,
  fuel: undefined,
  freight: undefined,
  travel: undefined,
  refrigerant: undefined,
};

export const initialCompanyData: CompanyData = {
  _id: '',
  companyName: '',
  numEmployees: 0,
  annualSales: 0,
  annualGrowth: 0,
  reportTitle: '',
  observationPeriod: '',
  observationEnd: '',
  observationObject: '',
  description: '',
  region: '',
};

export const Years = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024'];

export const ElectricityUnits = ['kWh', 'Wh', 'MWh', 'MJ', 'GJ', 'TJ', 'therm', 'MMBTU'];
export const ElectricityEnergySource = ['renewable', 'natural_gas', 'coal', 'biomass', 'nuclear'];
export const ElectricityConnection = ['grid', 'direct'];

export const HeatUnits = ['kWh', 'Wh', 'MWh', 'MJ', 'GJ', 'TJ', 'therm', 'MMBTU'];
export const HeatEnergySource = ['renewable', 'natural_gas', 'coal', 'biomass', 'nuclear'];
export const HeatLossFactor = ['low', 'medium', 'high'];

export const UnitsByCategory: any = {
  energy: ['Wh', 'kWh', 'MWh', 'MJ', 'GJ', 'TJ', 'BTU', 'therm', 'MMBTU'],
  volume: ['ml', 'l', 'm3', 'standard_cubic_foot', 'bbl'],
  weight: ['g', 'kg', 't', 'ton', 'lb'],
  number: ['number'],
  money: [
    'usd',
    'afn',
    'dzd',
    'ars',
    'aud',
    'bhd',
    'brl',
    'cad',
    'kyd',
    'cny',
    'dkk',
    'egp',
    'eur',
    'hkd',
    'huf',
    'isk',
    'inr',
    'iqd',
    'ils',
    'jpy',
    'lbp',
    'mxn',
    'mad',
    'nzd',
    'nok',
    'qar',
    'rub',
    'sar',
    'sgd',
    'zar',
    'krw',
    'sek',
    'chf',
    'thb',
    'twd',
    'tnd',
    'try',
    'aed',
    'gbp',
  ],
  time: ['ms', 's', 'm', 'h', 'day', 'year'],
  distance: ['m', 'km', 'ft', 'mi', 'nmi'],
};

export const FuelUnits = [
  'kWh',
  'Wh',
  'MWh',
  'MJ',
  'GJ',
  'TJ',
  'therm',
  'MMBTU',
  'ml',
  'l',
  'm3',
  'standard_cubic_foot',
  'bbl',
  'g',
  'kg',
  't',
  'lb',
];

export const preferredFuelOptions = ['diesel', 'biodiesel', 'gasoline'];

export const allOptions = Array.from(
  new Set([
    ...preferredFuelOptions,
    ...FuelTypeByCategory.energy,
    ...FuelTypeByCategory.volume,
    ...FuelTypeByCategory.weight,
  ])
);

export const initialSuppliers = [
  {
    company: 'BMW',
    responsable: 'Murat Silbir',
    email: 'Silbirmurat@gmail.com',
    phone: '+90 542 318 1690',
    group: 'Group name',
    checked: true,
  },
  {
    company: 'Audi',
    responsable: 'Elif Kaya',
    email: 'elif.kaya@example.com',
    phone: '+90 555 123 45 67',
    group: 'Group name',
    checked: true,
  },
  {
    company: 'Mercedes',
    responsable: 'Ahmet Demir',
    email: 'ahmet.demir@example.com',
    phone: '+90 533 987 65 43',
    group: 'Group name',
    checked: false,
  },
  {
    company: 'Toyota',
    responsable: 'Ayse Yildiz',
    email: 'ayse.yildiz@example.com',
    phone: '+90 512 456 78 90',
    group: 'Group name',
    checked: false,
  },
];

export const InitialTasks = [
  {
    name: 'Design Project Plan',
    assignment: 'Raphael Blass',
    date: '07/06/2024',
    status: 'Created',
    priority: 'Medium',
  },
  {
    name: 'Develop Login Feature',
    assignment: 'Raphael Blass',
    date: '07/06/2024',
    status: 'In Progress',
    priority: 'Normal',
  },
  {
    name: 'Write Unit Tests',
    assignment: 'Raphael Blass',
    date: '07/06/2024',
    status: 'Completed',
    priority: 'Low',
  },
];

export const StatusTaskTypes = ['TO DO', 'IN PROGRESS', 'REVIEW', 'CLOSED'];
export const PriorityTypes = ['Low', 'Normal', 'High', 'Urgent'];
export const StatusTypes = ['Active', 'Inactive', 'Suspended'];
export const TransportTypes = ['air', 'sea', 'road', 'rail'];
export const TravelTypes = ['air', 'car', 'rail'];
export const SpendTypes = ['air', 'road', 'rail', 'sea', 'hotel'];
export const CurrencyTypes = [
  `usd`,
  `afn`,
  `dzd`,
  `ars`,
  `aud`,
  `bhd`,
  `brl`,
  `cad`,
  `kyd`,
  `cny`,
  `dkk`,
  `egp`,
  `eur`,
  `hkd`,
  `huf`,
  `isk`,
  `inr`,
  `iqd`,
  `ils`,
  `jpy`,
  `lbp`,
  `mxn`,
  `mad`,
  `nzd`,
  `nok`,
  `qar`,
  `rub`,
  `sar`,
  `sgd`,
  `zar`,
  `krw`,
  `sek`,
  `chf`,
  `thb`,
  `twd`,
  `tnd`,
  `try`,
  `aed`,
  `gbp`,
];

export const initialRoutes: Routes = {
  start: '-',
  final: '-',
  km: 0,
  totalCo2: 0,
  amount: 0,
  transport_type: '',
  type: '',
  unit_type: '',
  checked: false,
};

export const Colors = [
  '#2EC276',
  '#0099FF',
  '#DD243B',
  '#ff0000',
  '#0000ff',
  '#ffa500',
  '#ff80ed',
  '#065535',
  '#133337',
  '#ffc0cb',
  '#ffe4e1',
  '#008080',
  '#e6e6fa',
  '#00ffff',
  '#ffd700',
  '#c6e2ff',
  '#ff7373',
  '#b0e0e6',
  '#40e0d0',
  '#d3ffce',
];

export const Category_types = [
  'Electricity',
  'Heat',
  'Fuel',
  'Freight',
  'Travel by Distance',
  'Travel by Expenditure',
  'Fugitive Gases',
];

export const Domains_types = [
  'general',
  'general_and_ecoinvent',
  'ecoinvent',
  'exiobase',
  'manufacturing',
  'manufacturing_and_ecoinvent',
];

export enum types {
  Electricity = 'Electricity',
  Fuel = 'Fuel',
  Hotel = 'Hotel',
  TravelDist = 'Travel by Distance',
  TravelExp = 'Travel by Expenditure',
  FugitiveGases = 'Fugitive Gases',
  Freight = 'Freight',
  CapitalGoods = 'Capital Goods',
  PurchasedServices = 'Purchased Services',
  UpstreamLeasedAssets = 'Upstream leased assets',
  DownstreamLeasedAssets = 'Downstream leased assets',
  ProcessSoldProducts = 'Process sold products',
  EndOfLifeTreatment = 'End of life treatment',
  UseSoldProducts = 'Use sold products',
  Franchise = 'Franchise',
  Investments = 'Investments',
}

export enum Categories {
  energy = 'energy',
  volume = 'volume',
  weight = 'weight',
  money = 'money',
  number = 'number',
}

export enum unitTypes {
  Ton = 't',
  Kilo = 'k',
  Kilometros = 'km',
  Kilovatios = 'kWh',
  Night = 'Nights',
}
