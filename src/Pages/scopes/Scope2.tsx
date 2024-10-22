import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  fetchAdvanceSearchData,
  fetchElectricityData,
  fetchFuelData,
  fetchHeatData,
} from '../../services/ClimatiqFunctions';
import { fetchCompanyData } from '../../services/CompanyFunctions';
import CustomTabPanel from '../../components/Scope2/CustomTabPanel';
import FinalResults from '../../components/FinalResults';
import Records from '../../components/Records';
import CustomToaster from '../../components/Toaster';
import TopSideHeader from '../../components/TopSideHeader';
import ButtonFooter from '../../components/ButtonFooter';
import { addScope, deleteScope, fetchTotalScopes } from '../../services/ScopesFunctions';
import AdvanceCalculation from '../../components/AdvanceCalculation/AdvanceCalculation';
import { initialScope } from '../../constants';
import { RegionCodes } from '../../constants/ClimatiQ';
import { useAuthContext } from '../../hooks/AuthContext';
import { CompanyData, Scope2 } from '../../types/Primary';
import { Search } from '../../components/AdvanceCalculation/ClimatiqCalculation/ClimatiQCalculation';

function Scope2NewUI() {
  const { user, token } = useAuthContext();

  const navigate = useNavigate();

  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [baseScope2, setBaseScope2] = useState<Scope2>(initialScope);
  const [finalScope2, setFinalScope2] = useState<Scope2 | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingResults, setLoadingResults] = useState(false);

  const [totalScopes, setTotalScopes] = useState<any | null>(null);

  const [value, setValue] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleInputChange = (path: string, value: any) => {
    setBaseScope2((prevState: Scope2) => {
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

  const handleBack = () => {
    navigate('/scope1');
  };

  const handleNext = () => {
    navigate('/scope3');
  };

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleClearAll = () => {
    setBaseScope2(initialScope);
    setFinalScope2(null);
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const getCo2Values = (res: any) => {
    if (value === 0 || value === 1) {
      return {
        co2e: res.consumption.co2e / (baseScope2?.amount ? baseScope2.amount : 1),
        co2e_unit: res.consumption.co2e_unit,
        total: res.consumption.co2e,
      };
    } else {
      return {
        co2e: res.combustion.co2e / (baseScope2?.amount ? baseScope2.amount : 1),
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

  const sectionValidations: { [key: number]: (baseScope2: Scope2) => boolean } = {
    0: (baseScope2: Scope2) => {
      return baseScope2.amount !== 0;
    },
    1: (baseScope2: Scope2) => {
      return baseScope2.amount !== 0;
    },
    2: (baseScope2: Scope2) => {
      return baseScope2.amount !== 0 && baseScope2.fuel?.fuel_type !== '';
    },
  };

  const handleCalculate = async () => {
    if (fetchBySection[value]) {
      const validateSection = sectionValidations[value];
      if (validateSection && !validateSection(baseScope2)) {
        showToast('warning', 'Complete all missing fields');
        return;
      }
      setLoading(true);
      try {
        const res = await fetchBySection[value](token);
        if (companyData) {
          const newScope2: Scope2 = {
            company: companyData?._id || '',
            scope: 2,
            type: getScopeType[value],
            amount: baseScope2?.amount || 0,
            unit_type: baseScope2?.unit_type || '',
            region: companyData?.region || '',
            year: baseScope2?.year || '',
            ...getCo2Values(res),
            energy: baseScope2?.energy || undefined,
            heat: baseScope2?.heat || undefined,
            fuel: baseScope2?.fuel || undefined,
          };
          setFinalScope2(newScope2);
        }
      } catch (error: any) {
        console.log(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = async (scope: any) => {
    if (totalScopes) {
      setLoadingResults(true);
      try {
        await deleteScope(token, 2, scope._id);
        await getTotalScopeData();
        showToast('success', 'The scope was deleted successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoadingResults(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (finalScope2 !== null) {
      setLoadingResults(true);
      try {
        await addScope(token, 2, finalScope2);
        await getTotalScopeData();
        showToast('success', 'The scope was created successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setFinalScope2(null);
        setLoadingResults(false);
      }
    }
  };

  const getIdByRegion = () => {
    const region = RegionCodes.find((region: any) => region.name === (baseScope2?.region || companyData?.region));
    return region?.id || '';
  };

  const fetchBySection: { [key: number]: (token: any) => Promise<void> } = {
    0: async (token: any) => {
      const res = await fetchElectricityData(
        token,
        baseScope2.year,
        getIdByRegion(),
        baseScope2?.amount,
        baseScope2?.unit_type,
        baseScope2?.energy?.connection || '',
        baseScope2?.energy?.energy_source || ''
      );
      return res;
    },
    1: async (token: any) => {
      const res = await fetchHeatData(
        token,
        baseScope2?.year,
        getIdByRegion(),
        baseScope2?.amount,
        baseScope2?.unit_type,
        baseScope2?.heat?.loss_factor || '',
        baseScope2?.heat?.energy_source || ''
      );
      return res;
    },
    2: async (token: any) => {
      const res = await fetchFuelData(
        token,
        baseScope2?.year,
        getIdByRegion(),
        baseScope2?.amount,
        baseScope2?.unit_type,
        baseScope2?.fuel?.fuel_type || ''
      );
      return res;
    },
  };

  const getTotalScopeData = async () => {
    try {
      const res = await fetchTotalScopes(token, 0);
      setTotalScopes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyData = async () => {
    try {
      await fetchCompanyData(token, user, setCompanyData);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    }
  };

  const handleSubmitAdvance = async (scope: any) => {
    if (scope !== null) {
      try {
        await addScope(token, 2, scope);
        await getTotalScopeData();
        showToast('success', 'The scope was created successfully');
      } catch (error: any) {
        console.error(error);
        showToast('error', 'An error has appear' + error);
      }
    }
  };

  const fetchResultsAdvanceData = async (token: any, pageNumber: number = 1, search?: Search) => {
    const res = await fetchAdvanceSearchData(token, pageNumber, 'sector=Energy', search);
    return res;
  };

  useEffect(() => {
    if (!companyData) {
      getCompanyData();
    }
    if (!totalScopes) {
      getTotalScopeData();
    }
  }, []);

  return (
    <div className="max-w-6xl pl-6">
      <TopSideHeader
        title="Scope2"
        description="Please fill out the fields below to enter your emissions information from Scope 2."
      >
        <AdvanceCalculation scopeNumber={2} fetchResults={fetchResultsAdvanceData} onSubmit={handleSubmitAdvance} />
      </TopSideHeader>
      <CustomTabPanel
        value={value}
        handleChange={handleChange}
        handleInputChange={handleInputChange}
        baseScope={baseScope2}
        setBaseScope={setBaseScope2}
        handleDetails={handleDetails}
        showDetails={showDetails}
        companyData={companyData}
        handleCalculate={handleCalculate}
      />
      <FinalResults
        finalScope={finalScope2}
        handleSubmit={handleSubmit}
        loading={loading}
        stationary={'2.1 Stationary Combustion'}
        type={'Electricity, Heat and Fuel'}
      />
      <ButtonFooter handleClearAll={handleClearAll} handleNext={handleNext} handleBack={handleBack} index={2} />
      <Records
        totalScopes={totalScopes}
        setTotalScopes={setTotalScopes}
        handleDelete={handleDelete}
        showToast={showToast}
        loadingResults={loadingResults}
        index={1}
      />
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
}

export default Scope2NewUI;
