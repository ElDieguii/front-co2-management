/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import TravelBySpend from './Spend/TravelBySpend';
import RoutesTable from '../RoutesTable';
import TravelByDistance from './Distance/TravelByDistance';
import { fetchTravelBySpendData } from '../../../services/ClimatiqFunctions';
import { types, unitTypes } from '../../../constants';
import { useAuthContext } from '../../../hooks/AuthContext';
import { Scope1 } from '../../../types/Primary';
import { getCurrentYear } from '../../../utils/limitDecimal';

function TravelComponent({
  scope,
  setFinalScope1,
  routes,
  setRoutes,
  companyData,
  handleInputChange,
  showDetails,
  handleDetails,
  showToast,
  selectedRoute,
  setSelectedRoute,
  loading,
  setLoading,
}: any) {
  const [selectedOption, setSelectedOption] = useState('distance');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const { token } = useAuthContext();

  const handleCalculateSpendRoute = async () => {
    setSelectedRoute(null);
    setLoading(true);
    try {
      const res = await fetchTravelBySpendData(token, scope);
      const newScope: Scope1 = {
        company: companyData?._id || '',
        scope: 1,
        type: types.TravelExp,
        amount: scope?.amount,
        unit_type: scope?.travel?.expenditure?.currency_type || '',
        region: companyData?.region || '',
        year: getCurrentYear(),
        co2e: res.co2e / scope?.amount,
        co2e_unit: unitTypes.Kilo,
        total: res.co2e,
        travel: {
          expenditure: {
            currency_type: scope?.travel?.expenditure?.currency_type,
            spend_type: scope?.travel?.expenditure?.spend_type,
            final_destination: res.spend_location.name || scope?.travel?.expenditure?.final_destination,
          },
        },
      };
      setFinalScope1(newScope);
      showToast('success', 'Currency Amount calculated correctly');
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoute) {
      const newScope: Scope1 = {
        company: companyData?._id || '',
        scope: 1,
        type: selectedRoute.type || '',
        amount: selectedRoute.amount || 0,
        unit_type: selectedRoute.unit_type || '',
        region: companyData?.region || '',
        year: getCurrentYear(),
        co2e: selectedRoute.totalCo2 / selectedRoute.amount,
        co2e_unit: unitTypes.Kilo,
        total: selectedRoute.totalCo2,
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
      setFinalScope1(newScope);
    }
  }, [selectedRoute]);

  return (
    <>
      <FormControl component="fieldset">
        <RadioGroup row aria-label="travel" name="travel-options" value={selectedOption} onChange={handleChange}>
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
  );
}

export default TravelComponent;
