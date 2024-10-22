import { Box, CircularProgress, Tab, Tabs, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { ScopeIcon } from '../assets/icons';
import CustomScopeCard from './CustomScopeCard';
import { Scope1, Scope2, Scope3 } from '../types/Primary';

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

const TabLabel = ({ icon: Icon, label, value, index, count }: any) => {
  return (
    <div className="flex flex-row items-center gap-1">
      {Icon && <Icon fontSize="small" />}
      <Typography className="normal-case text-xl">{label}</Typography>
      <div
        className={`ml-2 flex items-center justify-center w-5 h-5 rounded-full text-white text-xs ${
          value === index ? 'bg-blue-600' : 'bg-gray-400'
        }`}
      >
        {count}
      </div>
    </div>
  );
};

const Records: FC<any> = ({
  totalScopes,
  setTotalScopes,
  handleDelete,
  showToast,
  loadingResults,
  index,
  indexValue,
}) => {
  const [value, setValue] = useState(index);
  const TotalScopes1 = totalScopes?.filter((scopes: Scope1) => scopes.scope === 1);
  const TotalScopes2 = totalScopes?.filter((scopes: Scope2) => scopes.scope === 2);
  const TotalScopes3 = totalScopes?.filter((scopes: Scope3) => scopes.scope === 3);

  //ToDo: Change the diferents filters for the scopes because the advanced search is not bringing the correct type of filters
  const [valueScope, setValueScope] = useState(indexValue || 0);
  const stationaryTypes = ['Electricity', 'Heat', 'Fuel'];
  const mobileTypes = ['Freight', 'Travel by Distance', 'Travel by Expenditure'];
  const fugitiveTypes = ['Fugitive Gases'];

  const stationary = TotalScopes1?.filter((scope: Scope1) => stationaryTypes.includes(scope.type));
  const mobile = TotalScopes1?.filter((scope: Scope1) => mobileTypes.includes(scope.type));
  const fugitive = TotalScopes1?.filter((scope: Scope1) => fugitiveTypes.includes(scope.type));

  const tabData = [
    { label: 'Stationary', value: stationary },
    { label: 'Mobile', value: mobile },
    { label: 'Fugitive', value: fugitive },
  ];

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleValueChange = (_event: any, newValue: any) => {
    setValueScope(newValue);
  };

  return (
    <div className="mt-12">
      <div className="flex flex-col gap-3">
        <Typography className="font-bold text-xl">Recorded</Typography>
        <Typography className="text-gray-400">Please use the edit button to update the saved ones</Typography>
      </div>
      <div className="mt-6">
        <Box className="w-full">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', gap: 10 }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
              <Tab
                label={
                  <TabLabel
                    icon={ScopeIcon}
                    label="Scope 1"
                    value={value}
                    index={0}
                    count={TotalScopes1 ? TotalScopes1.length : 0}
                  />
                }
                className="justify-end mx-auto"
              />
              <Tab
                label={
                  <TabLabel
                    icon={ScopeIcon}
                    label="Scope 2"
                    value={value}
                    index={1}
                    count={TotalScopes2 ? TotalScopes2.length : 0}
                  />
                }
                className="justify-end mx-auto"
              />
              <Tab
                label={
                  <TabLabel
                    icon={ScopeIcon}
                    label="Scope 3"
                    value={value}
                    index={2}
                    count={TotalScopes3 ? TotalScopes3.length : 0}
                  />
                }
                className="justify-end mx-auto"
              />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {loadingResults ? (
              <div className="flex justify-center items-center h-10 mt-20 ">
                <CircularProgress />
              </div>
            ) : (
              TotalScopes1 && (
                <Box className="w-full">
                  <Tabs value={valueScope} onChange={handleValueChange} aria-label="basic tabs example">
                    {tabData.map((tab, index) => (
                      <Tab key={index} label={tab.label} />
                    ))}
                  </Tabs>
                  {tabData.map((tab, index) => (
                    <TabPanel key={index} value={valueScope} index={index}>
                      <CustomScopeCard
                        totalScopes={tab.value}
                        setTotalScopes={setTotalScopes}
                        handleDelete={handleDelete}
                        showToast={showToast}
                        scopeNum={1}
                      />
                    </TabPanel>
                  ))}
                </Box>
              )
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {loadingResults ? (
              <div className="flex justify-center items-center h-10 mt-20 ">
                <CircularProgress />
              </div>
            ) : (
              TotalScopes2 && (
                <CustomScopeCard
                  totalScopes={TotalScopes2}
                  setTotalScopes={setTotalScopes}
                  handleDelete={handleDelete}
                  showToast={showToast}
                  scopeNum={2}
                />
              )
            )}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {loadingResults ? (
              <div className="flex justify-center items-center h-10 mt-20 ">
                <CircularProgress />
              </div>
            ) : (
              TotalScopes3 && (
                <CustomScopeCard
                  totalScopes={TotalScopes3}
                  setTotalScopes={setTotalScopes}
                  handleDelete={handleDelete}
                  showToast={showToast}
                  scopeNum={3}
                />
              )
            )}
          </TabPanel>
        </Box>
      </div>
    </div>
  );
};

export default Records;
