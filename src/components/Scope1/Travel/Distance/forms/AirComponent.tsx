import { Grid, TextField } from '@mui/material';
import LabelForm from '../../../../LabelForm';

const AirComponent = ({ scope, handleInputChange }: any) => {
  return (
    <>
      <Grid item xs={6}>
        <LabelForm label="Class" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="class"
          className="mt-1"
          fullWidth
          required
          value={scope?.travel?.distance?.air?.class || ''}
          onChange={(e: any) => handleInputChange('travel.distance.air.class', e.target.value)}
        />
      </Grid>
    </>
  );
};
export default AirComponent;
