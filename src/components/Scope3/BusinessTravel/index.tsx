/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import {
  fetchElectricityData,
  fetchFuelData,
  fetchTravelBySpendData,
  fetchTravelHotelperNight,
} from '../../../services/ClimatiqFunctions';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Tab, Tabs } from '@mui/material';
import { CustomCargoIcon, CustomHotelIcon, ElectricityIcon, FuelIcon } from '../../../assets/icons';
import RoutesTable from '../../Scope1/RoutesTable';
import ElectricityForm from '../../Scope2/Forms/ElectricityForm';
import FuelForm from '../../Scope2/Forms/FuelForm';
import TravelByDistance from '../../Scope1/Travel/Distance/TravelByDistance';
import TravelBySpend from '../../Scope1/Travel/Spend/TravelBySpend';
import HotelForm from './Hotel/HotelForm';
import { initialRoutes, initialScope, types, unitTypes } from '../../../constants';
import { RegionCodes } from '../../../constants/ClimatiQ';
import { useAuthContext } from '../../../hooks/AuthContext';
import { Routes, Scope3 } from '../../../types/Primary';
import { getCurrentYear } from '../../../utils/limitDecimal';

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

interface Props {
  scope: any;
  setScope: (scope: any) => void;
  setFinalScope: (scope: any) => void;
  company: any;
  handleInputChange: (key: string, value: any) => void;
  showToast: (severity: any, message: any) => void;
}

const BusinessTravel: FC<Props> = ({ scope, setScope, company, setFinalScope, handleInputChange, showToast }) => {
  const { token } = useAuthContext();

  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [routes, setRoutes] = useState<Routes[]>([initialRoutes]);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);
  const [selectedOption, setSelectedOption] = useState('distance');

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
    handleClear();
  };

  const handleChangeOption = (_event: any, newValue: any) => {
    setSelectedOption(newValue);
    handleClear();
  };

  const handleClear = () => {
    setScope(initialScope);
    setRoutes([initialRoutes]);
    setSelectedRoute(null);
    setFinalScope(null);
  };

  const getCo2Values = (res: any) => {
    if (value === 0) {
      return {
        co2e: res.consumption.co2e / (scope?.amount ? scope.amount : 1),
        co2e_unit: res.consumption.co2e_unit,
        total: res.consumption.co2e,
        source: res?.consumption?.source_trail[0]?.source,
        source_dataset: res?.consumption?.source_trail[0]?.source_dataset,
      };
    } else {
      return {
        co2e: res.combustion.co2e / (scope?.amount ? scope.amount : 1),
        co2e_unit: res.combustion.co2e_unit,
        total: res.combustion.co2e,
        source: res?.combustion?.source_trail[0]?.source,
        source_dataset: res?.combustion?.source_trail[0]?.source_dataset,
      };
    }
  };

  const getScopeType: { [key: number]: string } = {
    0: types.Electricity,
    1: types.Fuel,
  };

  const sectionValidations: { [key: number]: (scope: Scope3) => boolean } = {
    0: (scope: Scope3) => {
      return scope.amount !== 0;
    },
    1: (scope: Scope3) => {
      return scope.amount !== 0 && scope.fuel?.fuel_type !== '';
    },
  };

  const getIdByRegion = () => {
    const region = RegionCodes.find((region: any) => region.name === (scope?.region || company?.region));
    return region?.id || '';
  };

  const fetchBySection: { [key: number]: (token: any) => Promise<void> } = {
    0: async (token: any) => {
      const res = await fetchElectricityData(
        token,
        scope.year,
        getIdByRegion(),
        scope?.amount,
        scope?.unit_type,
        scope?.energy?.connection || '',
        scope?.energy?.energy_source || ''
      );
      return res;
    },
    1: async (token: any) => {
      const res = await fetchFuelData(
        token,
        scope?.year,
        getIdByRegion(),
        scope?.amount,
        scope?.unit_type,
        scope?.fuel?.fuel_type || ''
      );
      return res;
    },
  };

  const handleCalculate = async () => {
    if (fetchBySection[value]) {
      const validateSection = sectionValidations[value];
      if (validateSection && !validateSection(scope)) {
        showToast('warning', 'Complete all missing fields');
        return;
      }
      setLoading(true);
      try {
        const res = await fetchBySection[value](token);
        if (company) {
          const newScope3: any = {
            company: company?._id || '',
            scope: 3,
            type: `Business Travel (${getScopeType[value]})`,
            amount: scope?.amount || 0,
            unit_type: scope?.unit_type || '',
            region: company?.region || '',
            year: scope?.year || '',
            ...getCo2Values(res),
            energy: scope?.energy || undefined,
            fuel: scope?.fuel || undefined,
          };
          setFinalScope(newScope3);
        }
      } catch (error: any) {
        console.log(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCalculateHotel = async () => {
    setLoading(true);
    try {
      const res = await fetchTravelHotelperNight(token, scope);
      if (company) {
        const newScope3: any = {
          company: company?._id || '',
          scope: 3,
          type: `Business Travel (${types.Hotel})`,
          amount: scope?.hotel?.hotel_nights || 0,
          unit_type: unitTypes.Night,
          region: company?.region || '',
          year: scope?.year || '',
          co2e: res?.co2e / (scope?.hotel?.hotel_nights ? scope.hotel?.hotel_nights : 1),
          co2e_unit: res.co2e_unit,
          total: res.co2e,
          source: res?.source_trail[0]?.source,
          source_dataset: res?.source_trail[0]?.source_dataset,
          hotel: {
            hotel_nights: scope?.hotel?.hotel_nights || 0,
            hotel_name: res?.source_trail[0]?.name || '',
            hotel_location: res?.source_trail[0]?.region_name || '',
            hotel_emission: res?.co2e || 0,
            hotel_emission_unit: res?.co2e_unit,
          },
        };
        setFinalScope(newScope3);
      }
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculateSpendRoute = async () => {
    setSelectedRoute(null);
    setLoading(true);
    try {
      const res = await fetchTravelBySpendData(token, scope);
      const newScope: Scope3 = {
        company: company?._id || '',
        scope: 3,
        type: `Business Travel (${types.TravelExp})`,
        amount: scope?.amount,
        unit_type: scope?.travel?.expenditure?.currency_type || '',
        region: company?.region || '',
        year: getCurrentYear(),
        co2e: res.co2e / scope?.amount,
        co2e_unit: unitTypes.Kilo,
        total: res.co2e,
        source: res?.source_trail[0]?.source,
        source_dataset: res?.source_trail[0]?.source_dataset,
        travel: {
          expenditure: {
            currency_type: scope?.travel?.expenditure?.currency_type,
            spend_type: scope?.travel?.expenditure?.spend_type,
            final_destination: res.spend_location.name || scope?.travel?.expenditure?.final_destination,
          },
        },
      };
      setFinalScope(newScope);
      showToast('success', 'Currency Amount calculated correctly');
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    switch (value) {
      case 0:
        setScope({
          ...initialScope,
          region: company?.region,
          year: getCurrentYear(),
          unit_type: unitTypes.Kilovatios,
          energy: {
            connection: 'grid',
          },
        });
        break;
      case 1:
        setScope({
          ...initialScope,
          region: company?.region,
          year: getCurrentYear(),
          unit_type: unitTypes.Kilovatios,
        });
        break;
      default:
        break;
    }
  }, [value, company]);

  useEffect(() => {
    if (selectedRoute) {
      const newScope: Scope3 = {
        company: company?._id || '',
        scope: 3,
        type: `Business Travel (${types.TravelDist})`,
        amount: selectedRoute.amount || 0,
        unit_type: selectedRoute.unit_type || '',
        region: company?.region || '',
        year: getCurrentYear(),
        co2e: selectedRoute.totalCo2 / selectedRoute.amount,
        co2e_unit: unitTypes.Kilo,
        total: selectedRoute.totalCo2,
        source: selectedRoute?.source,
        source_dataset: selectedRoute?.source_dataset,
        travel: {
          distance: {
            distance_km: selectedRoute.km,
            start_location: selectedRoute.start,
            travel_mode: selectedRoute.transport_type,
            final_destination: selectedRoute.final,
            air: selectedRoute.air || undefined,
            car: selectedRoute.car || undefined,
          },
        },
      };
      setFinalScope(newScope);
    }
  }, [selectedRoute]);

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
              label="Fuel"
              iconPosition="start"
              icon={<FuelIcon fontSize={'small'} />}
              className="normal-case gap-2 items-end text-base"
            />
            <Tab
              label="Travel"
              iconPosition="start"
              icon={<CustomCargoIcon />}
              className="normal-case items-end text-base"
            />
            <Tab
              label="Hotel"
              iconPosition="start"
              icon={<CustomHotelIcon />}
              className="normal-case items-end text-base"
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <ElectricityForm
            handleInputChange={handleInputChange}
            scope2={scope}
            handleDetails={handleDetails}
            showDetails={showDetails}
            companyData={company}
            handleCalculate={handleCalculate}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FuelForm
            handleInputChange={handleInputChange}
            scope2={scope}
            handleDetails={handleDetails}
            showDetails={showDetails}
            companyData={company}
            handleCalculate={handleCalculate}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="travel"
                name="travel-options"
                value={selectedOption}
                onChange={handleChangeOption}
              >
                <FormControlLabel value="distance" control={<Radio />} label="Travel by distance" />
                <FormControlLabel value="expenditure" control={<Radio />} label="Travel by expenditure" />
              </RadioGroup>
            </FormControl>
            {selectedOption === 'distance' && (
              <>
                <TravelByDistance
                  scope={scope}
                  handleInputChange={handleInputChange}
                  setRoutes={setRoutes}
                  setSelectedRoute={setSelectedRoute}
                  showToast={showToast}
                  setLoading={setLoading}
                  handleDetails={handleDetails}
                  showDetails={showDetails}
                  loading={loading}
                />
                <RoutesTable routes={routes} setRoutes={setRoutes} setSelectedRoute={setSelectedRoute} />
              </>
            )}
            {selectedOption === 'expenditure' && (
              <TravelBySpend
                scope={scope}
                handleInputChange={handleInputChange}
                handleCalculate={handleCalculateSpendRoute}
                loading={loading}
              />
            )}
          </>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <HotelForm scope={scope} handleInputChange={handleInputChange} handleCalculate={handleCalculateHotel} />
        </TabPanel>
      </Box>
    </div>
  );
};

export default BusinessTravel;
