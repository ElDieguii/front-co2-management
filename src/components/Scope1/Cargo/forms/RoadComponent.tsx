import { Grid, TextField } from '@mui/material';
import LabelForm from '../../../LabelForm';

const RoadComponent = ({ scope, handleInputChange }: any) => {
  return (
    <>
      <Grid item xs={6}>
        <LabelForm label="Vehicle type" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.road?.vehicle_type}
          onChange={(e: any) => handleInputChange('freight.road.vehicle_type', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Vehicle weight" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="weight"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.road?.vehicle_weight}
          onChange={(e: any) => handleInputChange('freight.road.vehicle_weight', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Fuel source" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="source"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.road?.fuel_source}
          onChange={(e: any) => handleInputChange('freight.road.fuel_source', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Load type" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.road?.load_type}
          onChange={(e: any) => handleInputChange('freight.road.load_type', e.target.value)}
        />
      </Grid>
    </>
  );
};
export default RoadComponent;
