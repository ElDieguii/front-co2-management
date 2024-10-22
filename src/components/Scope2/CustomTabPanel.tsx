import { useEffect } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import ElectricityForm from './Forms/ElectricityForm';
import HeatForm from './Forms/HeatForm';
import FuelForm from './Forms/FuelForm';
import { ElectricityIcon, HeatIcon, FuelIcon } from '../../assets/icons';
import { initialScope, unitTypes } from '../../constants';
import { getCurrentYear } from '../../utils/limitDecimal';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function CustomTabPanel({
  value,
  handleChange,
  handleInputChange,
  baseScope,
  setBaseScope,
  handleDetails,
  showDetails,
  companyData,
  handleCalculate,
}: any) {
  useEffect(() => {
    switch (value) {
      case 0:
        setBaseScope({
          ...initialScope,
          region: companyData?.region,
          year: getCurrentYear(),
          unit_type: unitTypes.Kilovatios,
          energy: {
            connection: 'grid',
          },
        });
        break;
      case 1:
        setBaseScope({
          ...initialScope,
          region: companyData?.region,
          year: getCurrentYear(),
          unit_type: unitTypes.Kilovatios,
          heat: {
            loss_factor: 'medium',
          },
        });
        break;
      case 2:
        setBaseScope({
          ...initialScope,
          region: companyData?.region,
          year: getCurrentYear(),
          unit_type: unitTypes.Kilovatios,
        });
        break;

      default:
        break;
    }
  }, [value, companyData]);

  return (
    <div>
      <Box className="w-full">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="mb-6">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab
              label="Electricity"
              iconPosition="start"
              icon={<ElectricityIcon fontSize={'small'} />}
              className="normal-case items-end text-base"
            />
            <Tab
              label="Heat"
              iconPosition="start"
              icon={<HeatIcon fontSize={'small'} />}
              className="normal-case items-end text-base"
            />
            <Tab
              label="Fuel"
              iconPosition="start"
              icon={<FuelIcon fontSize={'small'} />}
              className="normal-case gap-2 items-end text-base"
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ElectricityForm
            handleInputChange={handleInputChange}
            scope2={baseScope}
            handleDetails={handleDetails}
            showDetails={showDetails}
            companyData={companyData}
            handleCalculate={handleCalculate}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <HeatForm
            handleInputChange={handleInputChange}
            scope2={baseScope}
            handleDetails={handleDetails}
            showDetails={showDetails}
            companyData={companyData}
            handleCalculate={handleCalculate}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <FuelForm
            handleInputChange={handleInputChange}
            scope2={baseScope}
            handleDetails={handleDetails}
            showDetails={showDetails}
            companyData={companyData}
            handleCalculate={handleCalculate}
          />
        </TabPanel>
      </Box>
    </div>
  );
}

export default CustomTabPanel;
