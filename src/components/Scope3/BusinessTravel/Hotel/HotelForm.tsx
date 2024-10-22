import { Button, Grid, TextField } from '@mui/material';
import LabelForm from '../../../LabelForm';
import { FC } from 'react';
import { Scope3 } from '../../../../types/Primary';

interface props {
  scope: Scope3;
  handleInputChange: (name: string, value: string) => void;
  handleCalculate: () => void;
}

const HotelForm: FC<props> = ({ handleInputChange, scope, handleCalculate }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LabelForm label="Number of Nights" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="-"
          type="number"
          className="mt-1"
          fullWidth
          required
          value={scope?.hotel?.hotel_nights}
          onChange={(e) => handleInputChange('hotel.hotel_nights', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Location" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="-"
          className="mt-1"
          fullWidth
          required
          value={scope?.hotel?.hotel_location}
          onChange={(e) => handleInputChange('hotel.hotel_location', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Year" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="-"
          className="mt-1"
          fullWidth
          required
          value={scope?.year}
          onChange={(e) => handleInputChange('year', e.target.value)}
        />
      </Grid>
      <Grid item xs={12} className="flex justify-end">
        <Button variant="contained" className="px-10 py-2" onClick={handleCalculate}>
          Calculate
        </Button>
      </Grid>
    </Grid>
  );
};

export default HotelForm;
