import { Grid, TextField } from '@mui/material';
import LabelForm from '../../../../LabelForm';

const CarComponent = ({ scope, handleInputChange }: any) => {
  return (
    <>
      <Grid item xs={6}>
        <LabelForm label="Car size" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="size"
          className="mt-1"
          fullWidth
          required
          value={scope.travel?.distance?.car?.car_size || ''}
          onChange={(e: any) => handleInputChange('travel.distance.car.car_size', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Car type" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope.travel?.distance?.car?.car_type || ''}
          onChange={(e: any) => handleInputChange('travel.distance.car.car_type', e.target.value)}
        />
      </Grid>
    </>
  );
};
export default CarComponent;
