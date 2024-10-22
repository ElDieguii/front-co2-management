import BusinessTravel from './BusinessTravel';
import CapitalGoods from './CapitalGoods';
import EmployeeCommuting from './EmployeeCommuting';
import FuelEnergyActivities from './FuelEnergyActivities';
import PurchasedServices from './PurcharsedServices';
import UpstreamTransportDistribution from './Transportation&Distribution/upStream';
import DownstreamTransportDistribution from './Transportation&Distribution/downStream';
import UpstreamLeasedAssets from './LeasedAssets/upStream';
import DownstreamLeasedAssets from './LeasedAssets/downStream';
import WasteOperation from './WasteOperation';
import ProcessSoldProducts from './SoldProducts/processProducts';
import UseSoldProducts from './SoldProducts/useProducts';
import EndOfLifeTreatment from './EndTreatment';
import Franchise from './Franchise';
import Investments from './Investments';

export const Options = [
  {
    id: 1,
    label: 'Purchased Goods & Services',
    description:
      'Please fill out the fields below to enter your emissions information from Purchased goods and services.',
    link: 'purchased_goods_services',
    sector: [
      'Agriculture/Hunting/Forestry/Fishing',
      'Buildings and Infrastrucure',
      'Consumer goods and services',
      'Education',
      'Equipment',
      'Health and Social Care',
      'Information and Communication',
      'Insurance and Financial Services',
      'Land use',
      'Materials and Manufacturing',
      'Organizational Activities',
      'Water',
    ],
  },
  {
    id: 2,
    label: 'Capital Goods',
    description: 'Please fill out the fields below to enter your emissions information from Capital goods.',
    link: 'capital_goods',
    sector: ['Buildings and Infrastrucure', 'Equipment', 'Land use', 'Materials and Manufacturing'],
  },
  {
    id: 3,
    label: 'Fuel & Energy Activities',
    description: 'Please fill out the fields below to enter your emissions information from Fuel & Energy Activities.',
    link: 'fuel_energy_activities',
    sector: ['Energy'],
  },
  {
    id: 4,
    label: 'Upstream Transportation & Distribution',
    description:
      'Please fill out the fields below to enter your emissions information from Upstream Transportation and distribution.',
    link: 'up_transportation_distribution',
    sector: ['Transport', 'Energy'],
  },
  {
    id: 5,
    label: 'Waste in Operations',
    description: 'Please fill out the fields below to enter your emissions information from Waste in Operations.',
    link: 'waste_operations',
    sector: ['Waste'],
  },
  {
    id: 6,
    label: 'Business Travel',
    description: 'Please fill out the fields below to enter your emissions information from Business travel.',
    link: 'business_travel',
    sector: ['Restaurant and Accomodation', 'Transport', 'Energy'],
  },
  {
    id: 7,
    label: 'Employee Commuting',
    description: 'Please fill out the fields below to enter your emissions information from Employee Commuting',
    link: 'employee_commuting',
    sector: ['Transport', 'Energy'],
  },
  {
    id: 8,
    label: 'Upstream Leased Assets',
    description: 'Please fill out the fields below to enter your emissions information from Upstream Leased Assets.',
    link: 'upstream_leased_assets',
    sector: [],
  },
  {
    id: 9,
    label: 'Downstream Transport & Distribution',
    description:
      'Please fill out the fields below to enter your emissions information from Downstream Transportation and distribution.',
    link: 'dw_transportation_distribution',
    sector: ['Transport', 'Energy'],
  },
  {
    id: 10,
    label: 'Process of Sold Products',
    description: '',
    link: 'Process_Sold_Products',
    sector: [],
  },
  {
    id: 11,
    label: 'Use of Sold Products',
    description: '',
    link: 'use_sold_products',
    sector: [],
  },
  {
    id: 12,
    label: 'End-of-Life Treatment',
    description: '',
    link: 'end_life_treatment',
    sector: [],
  },
  {
    id: 13,
    label: 'Downstream Leased Assets',
    description: '',
    link: 'downstream_leased_assets',
    sector: [],
  },
  {
    id: 14,
    label: 'Franchise',
    description: '',
    link: 'franchise',
    sector: [],
  },
  {
    id: 15,
    label: 'Investments',
    description: '',
    link: 'investments',
    sector: [],
  },
];

export const Scope3Components = ({ activeTab, ...props }: any) => {
  switch (activeTab) {
    case 0:
      return <PurchasedServices {...props} />;
    case 1:
      return <CapitalGoods {...props} />;
    case 2:
      return <FuelEnergyActivities {...props} />;
    case 3:
      return <UpstreamTransportDistribution {...props} />;
    case 4:
      return <WasteOperation {...props} />;
    case 5:
      return <BusinessTravel {...props} />;
    case 6:
      return <EmployeeCommuting {...props} />;
    case 7:
      return <UpstreamLeasedAssets {...props} />;
    case 8:
      return <DownstreamTransportDistribution {...props} />;
    case 9:
      return <ProcessSoldProducts {...props} />;
    case 10:
      return <UseSoldProducts {...props} />;
    case 11:
      return <EndOfLifeTreatment {...props} />;
    case 12:
      return <DownstreamLeasedAssets {...props} />;
    case 13:
      return <Franchise {...props} />;
    case 14:
      return <Investments {...props} />;
    default:
      return (
        <div className="flex items-center justify-center min-h-[350px]">
          <p>No component available for this option.</p>
        </div>
      );
  }
};
