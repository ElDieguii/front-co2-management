import React, { FC, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import PricingCard from './PricingCard';
import CustomTable from './PricingTable';
import {
  PricingCompanyIcon,
  PricingEnterpriseIcon,
  PricingIcon,
  PricingSingleIcon,
  PricingTeamIcon,
} from '../../assets/icons';

interface PricingItem {
  _id: string;
  title: string;
  companies: string;
  price: number;
  hours: string;
  icon: JSX.Element;
}

interface PricingListsType {
  monthly: PricingItem[];
  annualy: PricingItem[];
  setup: PricingItem[];
}

export const PricingLists: PricingListsType = {
  monthly: [
    {
      _id: 'monthly_single',
      title: 'Single',
      companies: '1',
      price: 29,
      hours: '0 hours',
      icon: <PricingSingleIcon />,
    },
    { _id: 'monthly_team', title: 'Team', companies: '10', price: 59, hours: '2 hours', icon: <PricingTeamIcon /> },
    {
      _id: 'monthly_company',
      title: 'Company',
      companies: '10-100',
      price: 89,
      hours: '5 hours',
      icon: <PricingCompanyIcon />,
    },
    {
      _id: 'monthly_enterprise',
      title: 'Enterprise',
      companies: '> 100',
      price: 149,
      hours: 'On Request',
      icon: <PricingEnterpriseIcon />,
    },
  ],
  annualy: [
    {
      _id: 'annualy_single',
      title: 'Single',
      companies: '1',
      price: 299,
      hours: '0 hours',
      icon: <PricingSingleIcon />,
    },
    { _id: 'annualy_team', title: 'Team', companies: '10', price: 599, hours: '2 hours', icon: <PricingTeamIcon /> },
    {
      _id: 'annualy_company',
      title: 'Company',
      companies: '10-100',
      price: 899,
      hours: '5 hours',
      icon: <PricingCompanyIcon />,
    },
    {
      _id: 'annualy_enterprise',
      title: 'Enterprise',
      companies: '> 100',
      price: 1499,
      hours: 'On Request',
      icon: <PricingEnterpriseIcon />,
    },
  ],
  setup: [
    { _id: 'setup_single', title: 'Single', companies: '1', price: 0, hours: '0 hours', icon: <PricingSingleIcon /> },
    { _id: 'setup_team', title: 'Team', companies: '10', price: 0, hours: '2 hours', icon: <PricingTeamIcon /> },
    {
      _id: 'setup_company',
      title: 'Company',
      companies: '10-100',
      price: 0,
      hours: '5 hours',
      icon: <PricingCompanyIcon />,
    },
    {
      _id: 'setup_enterprise',
      title: 'Enterprise',
      companies: '> 100',
      price: 0,
      hours: 'On Request',
      icon: <PricingEnterpriseIcon />,
    },
  ],
};

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

interface PricingProps {
  callback: () => void;
}

const Pricing: FC<PricingProps> = ({ callback }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handlePricing = (_id: string) => {
    // ToDo: Add logic here to handle pricing method
    callback();
  };

  const pricingKeys = Object.keys(PricingLists) as Array<keyof PricingListsType>;

  return (
    <div className="w-full pl-6">
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-row gap-3 items-center">
          <PricingIcon />
          <Typography className="text-3xl font-normal">Pricing</Typography>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Typography className="text-gray-400">Choose plans and prices that suit your company.</Typography>
          <Box className="flex justify-end w-3/4">
            <Tabs value={value} onChange={handleChange} aria-label="pricing tabs">
              {pricingKeys.map((key, index) => (
                <Tab label={key.charAt(0).toUpperCase() + key.slice(1)} key={index} className="w-52 normal-case" />
              ))}
            </Tabs>
          </Box>
        </div>
      </div>
      {pricingKeys.map((key, index) => (
        <TabPanel value={value} index={index} key={index}>
          <div className="flex flex-row p-4 gap-4 justify-end mt-16">
            {PricingLists[key].map((item, itemIndex) => (
              <PricingCard
                title={item.title}
                companies={item.companies}
                price={item.price}
                hours={item.hours}
                icon={item.icon}
                id={item._id}
                key={itemIndex}
                handlePricing={handlePricing}
              />
            ))}
          </div>
          <div className="my-5"></div>
          <CustomTable />
        </TabPanel>
      ))}
    </div>
  );
};

export default Pricing;
