import { useEffect, useState } from 'react';
import FinalResults from '../FinalResults';
import ButtonFooter from '../ButtonFooter';
import FugitiveForm from './Fugitive/FugitiveForm';
import EstimateTable from './EstimateTable';
import { Typography } from '@mui/material';
import { fetchFugitiveData } from '../../services/ClimatiqFunctions';
import Records from '../Records';
import { types, unitTypes } from '../../constants';
import { useAuthContext } from '../../hooks/AuthContext';
import { Scope1 } from '../../types/Primary';

const FugitiveCombustion = ({
  scope,
  setBaseScope1,
  finalScope1,
  setFinalScope1,
  companyData,
  showToast,
  activity,
  setActivity,
  selectedResult,
  setSelectedResult,
  posibleFilters,
  setPosibleFilters,
  totalScopes,
  setTotalScopes,
  loadingResults,
  handleDelete,
  handleClearAll,
  handleBack,
  handleSubmit,
  handleNext,
}: any) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [resultLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

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

  const handleCalculate = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const res = await fetchFugitiveData(
        token,
        pageNumber,
        scope?.refrigerant?.emittent,
        scope?.refrigerant?.source,
        scope?.region,
        scope?.year
      );
      const filters = await fetchFugitiveData(token, pageNumber);
      if (!posibleFilters) {
        setPosibleFilters(filters.possible_filters);
      }
      setActivity(res);
      showToast('success', 'There are ' + res.total_results + ' Results');
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (pageNumber: number = 1) => {
    setLoading(true);
    try {
      const res = await fetchFugitiveData(
        token,
        pageNumber,
        scope?.refrigerant?.emittent,
        scope?.refrigerant?.source,
        scope?.region,
        scope?.year
      );
      setActivity(res);
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedResult) {
      const newScope: Scope1 = {
        company: companyData?._id,
        scope: 1,
        type: types.FugitiveGases,
        amount: scope?.amount || 0,
        unit_type: unitTypes.Kilo,
        region: selectedResult.region_name,
        year: selectedResult.year,
        co2e: selectedResult.factor,
        co2e_unit: unitTypes.Kilo,
        total: selectedResult.factor * scope?.amount,
        refrigerant: {
          emittent: selectedResult.name || scope?.refrigerant?.emittent,
          unit_type: selectedResult.unit_type,
          sector: selectedResult.sector,
          source_dataset: selectedResult.source_dataset,
          source: selectedResult.source,
          description: selectedResult.description,
        },
      };
      setFinalScope1(newScope);
    } else {
      setFinalScope1(null);
    }
  }, [selectedResult, scope?.amount]);

  return (
    <>
      <div className="mt-14 mb-16 flex flex-col gap-3">
        <Typography className="text-2xl font-medium">Fugitive Combustion</Typography>
        <Typography className="text-base font-nomal text-[#979DA6]">
          Please fill out the fields below to enter your emissions information from Fugitive Combustion.
        </Typography>
      </div>
      <FugitiveForm
        scope={scope}
        posibleFilters={posibleFilters}
        handleInputChange={handleInputChange}
        handleCalculate={handleCalculate}
        loading={loading}
        handleDetails={handleDetails}
        showDetails={showDetails}
      />
      {activity && (
        <EstimateTable
          activity={activity}
          selectedResult={selectedResult}
          setSelectedResult={setSelectedResult}
          refreshData={handleRefresh}
        />
      )}
      <FinalResults
        finalScope={finalScope1}
        handleSubmit={handleSubmit}
        loading={resultLoading}
        stationary={'1.3 Fugitive Combustion'}
        type={'Refrigerants Gases'}
      />
      <ButtonFooter handleClearAll={handleClearAll} handleNext={handleNext} handleBack={handleBack} index={1} />
      <Records
        totalScopes={totalScopes}
        setTotalScopes={setTotalScopes}
        handleDelete={handleDelete}
        loadingResults={loadingResults}
        showToast={showToast}
        indexValue={2}
        index={0}
      />
    </>
  );
};

export default FugitiveCombustion;
