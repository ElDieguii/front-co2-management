import { FC, useState } from 'react';
import CalculationForm from './form/CalculationForm';
import SearchTable from './table/SearchTable';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useAuthContext } from '../../../hooks/AuthContext';
import { Activity, PossibleFilters, Result } from '../../../types/ClimatiQ';
import { getCurrentYear } from '../../../utils/limitDecimal';
import FinalResults from '../../FinalResults';
import LabelForm from '../../LabelForm';

interface Props {
  scopeNumber: number;
  fetchResults: any;
  showToast: (severity: any, message: any) => void;
  onSubmit: (scope: any) => void;
}

export type Search = {
  emittent: string;
  amount: number;
  unit_type: string;
  region: string;
  year: string;
  source: string;
};

const ClimatiQCalculation: FC<Props> = ({ fetchResults, scopeNumber, showToast, onSubmit }) => {
  const { token, user } = useAuthContext();
  const [search, setSearch] = useState<Search | null>(null);
  const [finalEmission, setFinalEmission] = useState<any | null>(null);

  const [activity, setActivity] = useState<Activity | null>(null);
  const [posibleFilters, setPosibleFilters] = useState<PossibleFilters | null>(null);
  const [selectedResult, setSelectedResult] = useState<Result | null>(null);

  const [loading, setLoading] = useState(false);
  const [showCalculate, setShowCalculate] = useState(false);

  const handleSubmit = () => {
    onSubmit(finalEmission);
    setShowCalculate(false);
    setSelectedResult(null);
    setFinalEmission(null);
    setSearch(null);
  };

  const handleInputChange = (name: any, value: any) => {
    setSearch((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleFetchData = async (_event: any, pageNumber: number = 1) => {
    _event.preventDefault();
    setLoading(true);
    if (!search) {
      showToast('warning', 'Please enter an emittent or any parameter to search');
      setLoading(false);
      return;
    }
    try {
      const res = await fetchResults(token, pageNumber, search);
      let filters = await fetchResults(token, pageNumber);
      if (!posibleFilters) {
        filters.possible_filters.year = filters.possible_filters.year.map((y: any) => y.toString());
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
    if (!search) {
      return;
    }
    try {
      const res = await fetchResults(token, pageNumber, search);
      setActivity(res);
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async (_event: any) => {
    _event.preventDefault();
    setLoading(true);
    if (!search?.amount) {
      showToast('warning', 'Please enter an amount to complete the calculation');
      setLoading(false);
      return;
    }
    if (!selectedResult) {
      showToast('warning', 'Please select a result to calculate');
      setLoading(false);
      return;
    }
    try {
      const newScope: any = {
        company: user?.company || '',
        scope: scopeNumber,
        type: `Advance Calculation (${selectedResult.category})`,
        amount: search?.amount,
        unit_type: selectedResult.unit || '',
        region: selectedResult?.region_name || '',
        year: selectedResult.year || getCurrentYear(),
        co2e: selectedResult.factor,
        co2e_unit: selectedResult.unit || '',
        total: selectedResult.factor * search?.amount,
      };
      setFinalEmission(newScope);
    } catch (error) {
      console.error('Error while setting final emission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <CalculationForm
        search={search}
        posibleFilters={posibleFilters}
        handleInputChange={handleInputChange}
        handleCallback={handleFetchData}
      />
      {loading ? (
        <div className="flex items-center justify-center min-h-[225px]">
          <CircularProgress />
        </div>
      ) : (
        activity && (
          <>
            <SearchTable
              activity={activity}
              selectedResult={selectedResult}
              loading={loading}
              refreshData={handleRefresh}
              setSelectedResult={setSelectedResult}
              setShowCalculate={setShowCalculate}
            />
            <div className="flex flex-row justify-between items-end">
              <div className="w-1/4 flex flex-col gap-3">
                <LabelForm label="Amount" hasInfo={true} />
                <TextField
                  size="small"
                  variant="outlined"
                  placeholder="0"
                  fullWidth
                  type="number"
                  value={search?.amount || ''}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                />
              </div>
              <div className="w-1/4 flex justify-end">
                <Button
                  variant="contained"
                  className="normal-case px-14 py-3"
                  onClick={handleCalculate}
                  disabled={!showCalculate}
                >
                  Calculate
                </Button>
              </div>
            </div>
            <FinalResults
              finalScope={finalEmission}
              handleSubmit={handleSubmit}
              loading={loading}
              stationary={'Calculation Tool'}
              type={'Own Co2e Factor'}
            />
          </>
        )
      )}
    </div>
  );
};

export default ClimatiQCalculation;
