import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import FinalResults from '../FinalResults';
import ButtonFooter from '../ButtonFooter';
import CargoComponent from './Cargo/CargoComponent';
import TravelComponent from './Travel/TravelComponent';
import Records from '../Records';
import { Scope1 } from '../../types/Primary';

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

const MobileCombustionUI = ({
  baseScope1,
  setBaseScope1,
  companyData,
  finalScope,
  setFinalScope1,
  routes,
  setRoutes,
  showToast,
  setSelectedRoute,
  selectedRoute,
  totalScopes,
  setTotalScopes,
  handleDelete,
  handleSubmit,
  handleClearAll,
  handleBack,
  handleNext,
}: any) => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingResults] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleInputChange = (path: string, value: any) => {
    setBaseScope1((prevState: Scope1) => {
      const keys = path.split('.');
      const newState = { ...prevState };

      let currentLevel: any = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentLevel[keys[i]]) {
          currentLevel[keys[i]] = {};
        }
        currentLevel = currentLevel[keys[i]];
      }

      currentLevel[keys[keys.length - 1]] = value;

      return newState;
    });
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
    handleClearAll();
  };

  return (
    <>
      <div className="mt-14 mb-16 flex flex-col gap-3">
        <Typography className="text-2xl font-medium">Mobile Combustion</Typography>
        <Typography className="text-base font-nomal text-[#979DA6]">
          Please fill out the fields below to enter your emissions information from Mobile combustion.
        </Typography>
      </div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab label="Freight" className="normal-case items-end text-base" />
          <Tab label="Travel" className="normal-case items-end text-base" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CargoComponent
          baseScope1={baseScope1}
          setFinalScope1={setFinalScope1}
          routes={routes}
          setRoutes={setRoutes}
          companyData={companyData}
          handleInputChange={handleInputChange}
          showDetails={showDetails}
          handleDetails={handleDetails}
          showToast={showToast}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TravelComponent
          scope={baseScope1}
          setFinalScope1={setFinalScope1}
          routes={routes}
          setRoutes={setRoutes}
          companyData={companyData}
          handleInputChange={handleInputChange}
          showDetails={showDetails}
          handleDetails={handleDetails}
          showToast={showToast}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
          loading={loading}
          setLoading={setLoading}
        />
      </TabPanel>
      <FinalResults
        finalScope={finalScope}
        handleSubmit={handleSubmit}
        loading={loadingResults}
        stationary={'1.2 Mobile Combustion'}
        type={'Freight and Travel'}
      />
      <ButtonFooter handleClearAll={handleClearAll} handleNext={handleNext} handleBack={handleBack} index={1} />
      <Records
        totalScopes={totalScopes}
        setTotalScopes={setTotalScopes}
        handleDelete={handleDelete}
        loadingResults={loadingResults}
        showToast={showToast}
        indexValue={1}
        index={0}
      />
    </>
  );
};

export default MobileCombustionUI;
