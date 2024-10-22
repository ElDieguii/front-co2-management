import { FC, useState } from 'react';
import { Box, Tab, Typography, Tabs, Divider } from '@mui/material';
import { CustomSettingsIcon } from '../../../assets/icons';
import InitialCompanyForm from './company/InitialCompanyForm';
import InitialFacilityForm from './facility/InitialFacilityForm';
import InitialProductForm from './product/InitialProductForm';

function TabPanel(props: any) {
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

const InitialAdmin: FC<any> = ({ company, handleNext, handleInputChange }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-row gap-3 items-center">
          <CustomSettingsIcon />
          <Typography className="text-3xl font-normal">Add Company Data</Typography>
        </div>
        <Typography className="text-gray-400 ">Please select a reporting type</Typography>
      </div>

      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab label="Company" />
          <Tab label="Facility" disabled />
          <Tab label="Product" disabled />
        </Tabs>
      </Box>
      <Divider className="my-12" />
      <TabPanel value={value} index={0}>
        <InitialCompanyForm company={company} handleInputChange={handleInputChange} handleNext={handleNext} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <InitialFacilityForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <InitialProductForm />
      </TabPanel>
    </div>
  );
};

export default InitialAdmin;
