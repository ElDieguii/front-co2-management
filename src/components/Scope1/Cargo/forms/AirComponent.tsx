import { Grid, TextField } from '@mui/material';
import LabelForm from '../../../LabelForm';

const AirComponent = ({ scope, handleInputChange }: any) => {
  return (
    <>
      <Grid item xs={6}>
        <LabelForm label="Aircraft Type" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.air?.aircraft_type}
          onChange={(e: any) => handleInputChange('freight.air.aircraft_type', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Methodology" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="methodology"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.air?.methodology}
          onChange={(e: any) => handleInputChange('freight.air.methodology', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Radiative Forcing Index" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="Radiative forcing"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.air?.radiative_forcing_index}
          onChange={(e: any) => handleInputChange('freight.air.radiative_forcing_index', e.target.value)}
        />
      </Grid>
    </>
  );
};
export default AirComponent;
