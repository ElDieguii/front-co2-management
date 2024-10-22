import { Grid, TextField } from '@mui/material';
import LabelForm from '../../../LabelForm';

const RailComponent = ({ scope, handleInputChange }: any) => {
  return (
    <>
      <Grid item xs={6}>
        <LabelForm label="Fuel type" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.rail?.fuel_type}
          onChange={(e: any) => handleInputChange('freight.rail.fuel_type', e.target.value)}
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
          value={scope?.freight?.rail?.load_type}
          onChange={(e: any) => handleInputChange('freight.rail.load_type', e.target.value)}
        />
      </Grid>
    </>
  );
};
export default RailComponent;
