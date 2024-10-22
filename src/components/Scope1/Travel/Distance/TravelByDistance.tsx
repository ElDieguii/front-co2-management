import { FC } from 'react';
import { LoadingButton } from '@mui/lab';
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import LabelForm from '../../../LabelForm';
import AirComponent from './forms/AirComponent';
import CarComponent from './forms/CarComponent';
import { fetchTravelByDistanceData } from '../../../../services/ClimatiqFunctions';
import { unitTypes, initialRoutes, TravelTypes, types } from '../../../../constants';
import { useAuthContext } from '../../../../hooks/AuthContext';

const TravelByDistance = ({
  scope,
  handleInputChange,
  setRoutes,
  setSelectedRoute,
  showToast,
  setLoading,
  handleDetails,
  showDetails,
  loading,
}: any) => {
  const { token } = useAuthContext();

  const getTransportType: { [key: string]: FC } = {
    air: AirComponent,
    car: CarComponent,
  };

  const TravelComponent = scope?.travel?.distance?.travel_mode
    ? getTransportType[scope?.travel?.distance?.travel_mode]
    : null;

  const componentParams: any = {
    scope,
    handleInputChange,
  };

  const handleCalculateDistanceRoute = async () => {
    setSelectedRoute(null);
    setLoading(true);
    try {
      const res = await fetchTravelByDistanceData(
        token,
        scope?.travel?.distance?.start_location,
        scope?.travel?.distance?.travel_mode,
        scope?.travel?.distance?.final_destination,
        scope?.travel?.distance?.distance_km
      );

      const newRoute = {
        checked: false,
        start: res.origin.name,
        final: res.destination.name,
        type: types.TravelDist,
        unit_type: unitTypes.Kilometros,
        amount: res.distance_km,
        transport_type: scope.travel?.distance?.travel_mode || '',
        km: res.distance_km,
        totalCo2: res.co2e,
        source: res.source_trail[0]?.source,
        source_dataset: res.source_trail[0]?.source_dataset,
        air: scope?.travel?.distance?.air || undefined,
        car: scope?.travel?.distance?.car || undefined,
      };
      setRoutes((prevRoutes: []) => {
        const updatedRoutes = prevRoutes.filter((route) => route !== initialRoutes);
        return [...updatedRoutes, newRoute];
      });
      showToast('success', 'Route created correctly');
    } catch (error: any) {
      console.error(error);
      showToast('error', 'An error has appeared: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={2} className="mt-4">
      <Grid item xs={6}>
        <LabelForm label="Distance" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="0"
          className="mt-1"
          type="number"
          fullWidth
          required
          value={scope?.travel?.distance?.distance_km || ''}
          onChange={(e) => handleInputChange('travel.distance.distance_km', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Travel Mode" required={true} hasInfo={true} />
        <Autocomplete
          freeSolo
          options={TravelTypes}
          value={scope?.travel?.distance?.travel_mode || ''}
          onInputChange={(_e, value) => handleInputChange('travel.distance.travel_mode', value)}
          renderInput={(params) => <TextField {...params} size="small" placeholder="Type" className="mt-1" fullWidth />}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Start Location" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="Start Location"
          className="mt-1"
          fullWidth
          required
          value={scope?.travel?.distance?.start_location || ''}
          onChange={(e) => handleInputChange('travel.distance.start_location', e.target.value)}
        />
      </Grid>

      <Grid item xs={6}>
        <LabelForm label="Final Destination" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="Final Destination"
          className="mt-1"
          fullWidth
          required
          value={scope?.travel?.distance?.final_destination || ''}
          onChange={(e) => handleInputChange('travel.distance.final_destination', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          className="text-gray-500 border-gray-400 justify-start normal-case text-base mt-2"
          onClick={handleDetails}
          disabled={!scope?.travel?.distance?.travel_mode ? true : false}
        >
          {showDetails ? 'Less Details' : 'Details'}
        </Button>
      </Grid>

      {showDetails && <>{TravelComponent && <TravelComponent {...componentParams} />}</>}
      <Grid item xs={12} className="flex justify-end">
        <LoadingButton
          variant="outlined"
          className="px-10 py-2"
          onClick={handleCalculateDistanceRoute}
          disabled={
            scope?.travel?.distance?.start_location && scope?.travel?.distance?.final_destination ? false : true
          }
          loading={loading}
        >
          Calculate
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default TravelByDistance;
