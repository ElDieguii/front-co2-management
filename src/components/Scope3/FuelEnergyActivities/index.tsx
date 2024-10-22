import { FC, useState } from 'react';
import { fetchElectricityData, fetchFuelData, fetchHeatData } from '../../../services/ClimatiqFunctions';
import CustomTabPanel from '../../Scope2/CustomTabPanel';
import { RegionCodes } from '../../../constants/ClimatiQ';
import { useAuthContext } from '../../../hooks/AuthContext';
import { Scope3 } from '../../../types/Primary';

interface Props {
  scope: any;
  setScope: (scope: any) => void;
  setFinalScope: (scope: any) => void;
  company: any;
  handleInputChange: (key: string, value: any) => void;
  showToast: (severity: any, message: any) => void;
}

const FuelEnergyActivities: FC<Props> = ({ scope, setScope, company, setFinalScope, handleInputChange, showToast }) => {
  const { token } = useAuthContext();

  const [value, setValue] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [, setLoading] = useState(false);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const getCo2Values = (res: any) => {
    if (value === 0 || value === 1) {
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
    1: 'Heat',
    2: 'Fuel',
  };

  const sectionValidations: { [key: number]: (scope: Scope3) => boolean } = {
    0: (scope: Scope3) => {
      return scope.amount !== 0;
    },
    1: (scope: Scope3) => {
      return scope.amount !== 0;
    },
    2: (scope: Scope3) => {
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
      const res = await fetchHeatData(
        token,
        scope?.year,
        getIdByRegion(),
        scope?.amount,
        scope?.unit_type,
        scope?.heat?.loss_factor || '',
        scope?.heat?.energy_source || ''
      );
      return res;
    },
    2: async (token: any) => {
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
            type: `Fuel & Energy Activities (${getScopeType[value]})`,
            amount: scope?.amount || 0,
            unit_type: scope?.unit_type || '',
            region: company?.region || '',
            year: scope?.year || '',
            ...getCo2Values(res),
            energy: scope?.energy || undefined,
            heat: scope?.heat || undefined,
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

  return (
    <CustomTabPanel
      value={value}
      handleChange={handleChange}
      handleInputChange={handleInputChange}
      baseScope={scope}
      setBaseScope={setScope}
      handleDetails={handleDetails}
      showDetails={showDetails}
      companyData={company}
      handleCalculate={handleCalculate}
    />
  );
};

export default FuelEnergyActivities;
