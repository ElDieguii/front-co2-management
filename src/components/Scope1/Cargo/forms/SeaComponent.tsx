import { Grid, TextField } from '@mui/material';
import LabelForm from '../../../LabelForm';

const SeaComponent = ({ scope, handleInputChange }: any) => {
  return (
    <>
      <Grid item xs={6}>
        <LabelForm label="Vessel type" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.sea?.vessel_type}
          onChange={(e: any) => handleInputChange('freight.sea.vessel_type', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Tonnage" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="tonnage"
          className="mt-1"
          fullWidth
          required
          value={scope?.freight?.sea?.tonnage}
          onChange={(e: any) => handleInputChange('freight.sea.tonnage', e.target.value)}
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
          value={scope?.freight?.sea?.fuel_source}
          onChange={(e: any) => handleInputChange('freight.sea.fuel_source', e.target.value)}
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
          value={scope?.freight?.sea?.load_type}
          onChange={(e: any) => handleInputChange('freight.sea.load_type', e.target.value)}
        />
      </Grid>
    </>
  );
};
export default SeaComponent;
