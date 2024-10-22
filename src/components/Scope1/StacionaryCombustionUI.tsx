import { useState } from 'react';
import { fetchElectricityData, fetchFuelData, fetchHeatData } from '../../services/ClimatiqFunctions';
import ButtonFooter from '../ButtonFooter';
import CustomTabPanel from '../Scope2/CustomTabPanel';
import FinalResults from '../FinalResults';
import Records from '../Records';
import { Typography } from '@mui/material';
import { RegionCodes } from '../../constants/ClimatiQ';
import { useAuthContext } from '../../hooks/AuthContext';
import { Scope1 } from '../../types/Primary';

const StacionaryCombustionUI = ({
  baseScope1,
  setBaseScope1,
  companyData,
  finalScope1,
  setFinalScope1,
  totalScopes,
  setTotalScopes,
  showToast,
  loadingResults,
  handleNext,
  handleClearAll,
  handleBack,
  handleSubmit,
  handleDelete,
}: any) => {
  const { token } = useAuthContext();
  const [value, setvalue] = useState(0);
  const [loading, setLoading] = useState(false);
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
    setvalue(newValue);
  };

  const getIdByRegion = () => {
    const region = RegionCodes.find((region: any) => region.name === (baseScope1?.region || companyData?.region));
    return region?.id || '';
  };

  const fetchBySection: { [key: number]: (token: any) => Promise<void> } = {
    0: async (token: any) => {
      const res = await fetchElectricityData(
        token,
        baseScope1.year,
        getIdByRegion(),
        baseScope1?.amount,
        baseScope1?.unit_type,
        baseScope1?.energy?.connection || '',
        baseScope1?.energy?.energy_source || ''
      );
      return res;
    },
    1: async (token: any) => {
      const res = await fetchHeatData(
        token,
        baseScope1?.year,
        getIdByRegion(),
        baseScope1?.amount,
        baseScope1?.unit_type,
        baseScope1?.heat?.loss_factor || '',
        baseScope1?.heat?.energy_source || ''
      );
      return res;
    },
    2: async (token: any) => {
      const res = await fetchFuelData(
        token,
        baseScope1?.year,
        getIdByRegion(),
        baseScope1?.amount,
        baseScope1?.unit_type,
        baseScope1?.fuel?.fuel_type || ''
      );
      return res;
    },
  };

  const getCo2Values = (res: any) => {
    if (value === 0 || value === 1) {
      return {
        co2e: res.consumption.co2e / (baseScope1?.amount ? baseScope1.amount : 1),
        co2e_unit: res.consumption.co2e_unit,
        total: res.consumption.co2e,
      };
    } else {
      return {
        co2e: res.combustion.co2e / (baseScope1?.amount ? baseScope1.amount : 1),
        co2e_unit: res.combustion.co2e_unit,
        total: res.combustion.co2e,
      };
    }
  };

  const getScopeType: { [key: number]: string } = {
    0: 'Electricity',
    1: 'Heat',
    2: 'Fuel',
  };

  const sectionValidations: { [key: number]: (baseScope1: Scope1) => boolean } = {
    0: (baseScope1: Scope1) => {
      return baseScope1.amount !== 0;
    },
    1: (baseScope1: Scope1) => {
      return baseScope1.amount !== 0;
    },
    2: (baseScope1: Scope1) => {
      return baseScope1.amount !== 0 && baseScope1.fuel?.fuel_type !== '';
    },
  };

  const handleCalculate = async () => {
    if (fetchBySection[value]) {
      const validateSection = sectionValidations[value];
      if (validateSection && !validateSection(baseScope1)) {
        showToast('warning', 'Complete all missing fields');
        return;
      }
      setLoading(true);
      try {
        const res = await fetchBySection[value](token);
        if (companyData) {
          const newScope1: Scope1 = {
            company: companyData?._id || '',
            scope: 1,
            type: getScopeType[value],
            amount: baseScope1?.amount || 0,
            unit_type: baseScope1?.unit_type || '',
            region: companyData?.region || '',
            year: baseScope1?.year || '',
            ...getCo2Values(res),
            energy: baseScope1?.energy || undefined,
            heat: baseScope1?.heat || undefined,
            fuel: baseScope1?.fuel || undefined,
          };
          setFinalScope1(newScope1);
          setLoading(false);
        } else {
          setLoading(false);
          return;
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        showToast('error', 'An error has appeared: ' + error.message);
      }
    }
  };

  return (
    <>
      <div className="mt-14 mb-10 flex flex-col gap-3">
        <Typography className="text-2xl font-medium">Stationary Combustion</Typography>
        <Typography className="text-base font-nomal text-[#979DA6]">
          Please fill out the fields below to enter your emissions information from stationary combustion.
        </Typography>
      </div>
      <CustomTabPanel
        value={value}
        handleChange={handleChange}
        handleInputChange={handleInputChange}
        baseScope={baseScope1}
        setBaseScope={setBaseScope1}
        handleDetails={handleDetails}
        showDetails={showDetails}
        companyData={companyData}
        handleCalculate={handleCalculate}
      />
      <FinalResults
        finalScope={finalScope1}
        handleSubmit={handleSubmit}
        loading={loading}
        stationary={'1.1 Stationary Combustion'}
        type={'Electricity, Heat and Fuel'}
      />
      <ButtonFooter handleClearAll={handleClearAll} handleNext={handleNext} handleBack={handleBack} index={1} />
      <Records
        totalScopes={totalScopes}
        setTotalScopes={setTotalScopes}
        handleDelete={handleDelete}
        loadingResults={loadingResults}
        showToast={showToast}
        indexValue={0}
        index={0}
      />
    </>
  );
};

export default StacionaryCombustionUI;
