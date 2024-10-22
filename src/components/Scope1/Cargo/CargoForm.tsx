import { FC, useState } from 'react';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import LabelForm from '../../LabelForm';
import AirComponent from './forms/AirComponent';
import RailComponent from './forms/RailComponent';
import RoadComponent from './forms/RoadComponent';
import SeaComponent from './forms/SeaComponent';
import { fetchCargoData } from '../../../services/ClimatiqFunctions';
import { LoadingButton } from '@mui/lab';
import { unitTypes, initialRoutes, TransportTypes, types } from '../../../constants';
import { useAuthContext } from '../../../hooks/AuthContext';

interface Props {
  scope: any;
  setRoutes: (routes: any) => void;
  handleInputChange: (key: string, value: any) => void;
  showDetails: boolean;
  handleDetails: () => void;
  showToast: (severity: any, message: any) => void;
  setSelectedRoute: (route: any) => void;
}

const CargoForm: FC<Props> = ({
  scope,
  setRoutes,
  handleInputChange,
  showDetails,
  handleDetails,
  showToast,
  setSelectedRoute,
}) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const getTransportType: { [key: string]: FC } = {
    air: AirComponent,
    sea: SeaComponent,
    road: RoadComponent,
    rail: RailComponent,
  };

  const TransportComponent = scope?.freight?.transport_type ? getTransportType[scope?.freight?.transport_type] : null;

  const componentParams: any = {
    scope,
    handleInputChange,
  };

  const handleCalculateRoute = async () => {
    setSelectedRoute(null);
    setLoading(true);
    try {
      let startLocation = '';
      let endLocation = '';
      const res = await fetchCargoData(
        token,
        scope?.amount,
        scope?.freight?.start_location,
        scope?.freight?.transport_type,
        scope?.freight?.end_location
      );
      res.route.forEach((item: any) => {
        if (item.type === 'location') {
          if (!startLocation) {
            startLocation = item.name;
          } else {
            endLocation = item.name;
          }
        }
      });
      const newRoute = {
        checked: false,
        start: startLocation || scope?.freight?.start_location,
        final: endLocation || scope?.freight?.end_location,
        type: types.Freight,
        unit_type: unitTypes.Ton,
        amount: scope?.amount || 0,
        transport_type: res.transport_mode || scope?.freight?.transport_type,
        km: res.distance_km,
        totalCo2: res.co2e,
        air: scope?.freight?.air || undefined,
        sea: scope?.freight?.sea || undefined,
        road: scope?.freight?.road || undefined,
        rail: scope?.freight?.rail || undefined,
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
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LabelForm label="Cargo in (t)" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="0"
          className="mt-1"
          type="number"
          fullWidth
          required
          value={scope?.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Transport Type" required={true} hasInfo={true} />
        <Autocomplete
          freeSolo
          options={TransportTypes}
          value={scope?.freight?.transport_type || ''}
          onInputChange={(_e, value) => handleInputChange('freight.transport_type', value)}
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
          value={scope?.freight?.start_location || ''}
          onChange={(e) => handleInputChange('freight.start_location', e.target.value)}
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
          value={scope?.freight?.end_location || ''}
          onChange={(e) => handleInputChange('freight.end_location', e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          className="text-gray-500 border-gray-400 justify-start normal-case text-base mt-2"
          onClick={handleDetails}
          // disabled={!scope?.freight?.transport_type ? true : false}
          disabled={true}
        >
          {showDetails ? 'Less Details' : 'Details'}
        </Button>
      </Grid>

      {showDetails && <>{TransportComponent && <TransportComponent {...componentParams} />}</>}
      <Grid item xs={12} className="flex justify-end">
        <LoadingButton
          variant="outlined"
          className="px-10 py-2"
          onClick={handleCalculateRoute}
          disabled={scope?.freight?.start_location && scope?.freight?.end_location ? false : true}
          loading={loading}
        >
          Calculate
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default CargoForm;
