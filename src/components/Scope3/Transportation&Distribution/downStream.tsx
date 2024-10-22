/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { fetchElectricityData, fetchFuelData } from '../../../services/ClimatiqFunctions';
import { Box, Tab, Tabs } from '@mui/material';
import { CustomCargoIcon, ElectricityIcon, FuelIcon } from '../../../assets/icons';
import CargoForm from '../../Scope1/Cargo/CargoForm';
import RoutesTable from '../../Scope1/RoutesTable';
import ElectricityForm from '../../Scope2/Forms/ElectricityForm';
import FuelForm from '../../Scope2/Forms/FuelForm';
import { initialRoutes, initialScope, unitTypes } from '../../../constants';
import { RegionCodes } from '../../../constants/ClimatiQ';
import { useAuthContext } from '../../../hooks/AuthContext';
import { Routes, Scope3 } from '../../../types/Primary';

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

const DownstreamTransportDistribution: FC<Props> = ({
  scope,
  setScope,
  company,
  setFinalScope,
  handleInputChange,
  showToast,
}) => {
  const { token } = useAuthContext();

  const [value, setValue] = useState(0);
  const [, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [routes, setRoutes] = useState<Routes[]>([initialRoutes]);
  const [selectedRoute, setSelectedRoute] = useState<any | null>(null);

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
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
    0: 'Electricity',
    1: 'Fuel',
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
            type: `Downstream Transportation & Distribution (${getScopeType[value]})`,
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
  useEffect(() => {
    switch (value) {
      case 0:
        setScope({
          ...initialScope,
          region: company?.region,
          year: '2024',
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
          year: '2024',
          unit_type: unitTypes.Kilovatios,
        });
        break;
      default:
        break;
    }
  }, [value, company]);

  useEffect(() => {
    if (selectedRoute) {
      const newScope: any = {
        company: company?._id || '',
        scope: 3,
        type: `Downstream Transportation & Distribution (${selectedRoute?.type})`,
        amount: selectedRoute.amount || 0,
        unit_type: selectedRoute.unit_type || '',
        region: company?.region || '',
        year: '2024',
        co2e: selectedRoute.totalCo2 / selectedRoute.amount,
        co2e_unit: 'kg',
        total: selectedRoute.totalCo2,
        freight: {
          distance: selectedRoute.km,
          start_location: selectedRoute.start,
          transport_type: selectedRoute.transport_type,
          end_location: selectedRoute.final,
          air: selectedRoute?.air || undefined,
          sea: selectedRoute?.sea || undefined,
          road: selectedRoute?.road || undefined,
          rail: selectedRoute?.rail || undefined,
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
              label="Cargo"
              iconPosition="start"
              icon={<CustomCargoIcon />}
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
          <CargoForm
            scope={scope}
            setRoutes={setRoutes}
            handleInputChange={handleInputChange}
            showDetails={showDetails}
            handleDetails={handleDetails}
            showToast={showToast}
            setSelectedRoute={setSelectedRoute}
          />
          <RoutesTable routes={routes} setRoutes={setRoutes} setSelectedRoute={setSelectedRoute} />
        </TabPanel>
      </Box>
    </div>
  );
};

export default DownstreamTransportDistribution;
