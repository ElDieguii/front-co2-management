import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import LabelForm from '../../LabelForm';
import { LoadingButton } from '@mui/lab';
import { Years } from '../../../constants';
import { Sources_database, RegionCodes } from '../../../constants/ClimatiQ';

function FugitiveForm({
  scope,
  posibleFilters,
  handleInputChange,
  handleCalculate,
  loading,
  handleDetails,
  showDetails,
}: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LabelForm label="Emittent" hasInfo={true} />
        <TextField
          size="small"
          placeholder="Emittent"
          className="mt-1"
          fullWidth
          required
          value={scope?.refrigerant?.emittent || ''}
          onChange={(e) => handleInputChange('refrigerant.emittent', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Amount" hasInfo={true} />
        <TextField
          size="small"
          placeholder="0"
          className="mt-1"
          type="number"
          fullWidth
          required
          value={scope?.amount || ''}
          onChange={(e) => handleInputChange('amount', e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="outlined"
          className="text-gray-500 border-gray-400 justify-start normal-case text-base mt-2"
          onClick={handleDetails}
        >
          {showDetails ? 'Less Details' : 'Details'}
        </Button>
      </Grid>

      {showDetails && (
        <>
          <Grid item xs={6}>
            <LabelForm label="Database" hasInfo={true} />
            <Autocomplete
              freeSolo
              options={posibleFilters?.source?.map((s: any) => s.source) || Sources_database.map((s: any) => s.source)}
              value={scope?.refrigerant?.source || ''}
              onInputChange={(_e, value) => handleInputChange('refrigerant.source', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Database" className="mt-1" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Region" hasInfo={true} />
            <Autocomplete
              key={scope?.region}
              value={RegionCodes.find((item) => item.id === scope?.region)}
              onChange={(_event, newValue) => handleInputChange('region', newValue ? newValue.id : '')}
              options={posibleFilters?.region || RegionCodes}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Region" className="mt-1" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Year" hasInfo={true} />
            <Autocomplete
              freeSolo
              options={posibleFilters?.year || Years}
              value={scope?.year}
              onInputChange={(_e, value) => handleInputChange('year', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Year" className="mt-1" fullWidth />
              )}
            />
          </Grid>
        </>
      )}

      <Grid item xs={12} className="flex justify-end">
        <LoadingButton
          loading={loading}
          variant="contained"
          className="px-10 py-2 normal-case"
          onClick={() => handleCalculate()}
        >
          View results
        </LoadingButton>
      </Grid>
    </Grid>
  );
}

export default FugitiveForm;
