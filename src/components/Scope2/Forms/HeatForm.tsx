import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import LabelForm from '../../LabelForm';
import { HeatUnits, HeatEnergySource, HeatLossFactor, Years } from '../../../constants';
import { RegionCodes } from '../../../constants/ClimatiQ';

function HeatForm({ handleInputChange, scope2, handleDetails, showDetails, handleCalculate }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <LabelForm label="Amount" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="type"
          className="mt-1"
          fullWidth
          required
          value={scope2?.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Unit Type" required={true} hasInfo={true} />
        <Autocomplete
          freeSolo
          options={HeatUnits}
          value={scope2?.unit_type}
          onInputChange={(_e, value) => handleInputChange('unit_type', value)}
          renderInput={(params) => <TextField {...params} size="small" placeholder="Type" className="mt-1" fullWidth />}
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
            <LabelForm label="Energy Source" required={true} hasInfo={true} />
            <Autocomplete
              freeSolo
              options={HeatEnergySource}
              value={scope2?.heat?.energy_source || ''}
              onInputChange={(_e, value) => handleInputChange('heat.energy_source', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Source" className="mt-1" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Loss Factor" required={true} hasInfo={true} />
            <Autocomplete
              freeSolo
              options={HeatLossFactor}
              value={scope2?.heat?.loss_factor || ''}
              defaultValue={'medium'}
              onInputChange={(_e, value) => handleInputChange('heat.loss_factor', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Factor" className="mt-1" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Region" required={true} hasInfo={true} />
            <Autocomplete
              key={scope2?.region}
              value={RegionCodes.find((item) => item.name === scope2?.region)}
              onChange={(_event, newValue) => handleInputChange('region', newValue ? newValue.name : '')}
              options={RegionCodes}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Region" className="mt-1" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Year" required={true} hasInfo={true} />
            <Autocomplete
              freeSolo
              options={Years}
              value={scope2?.year}
              onInputChange={(_e, value) => handleInputChange('year', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Year" className="mt-1" fullWidth />
              )}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} className="flex justify-end">
        <Button variant="contained" className="px-10 py-2" onClick={handleCalculate}>
          Calculate
        </Button>
      </Grid>
    </Grid>
  );
}

export default HeatForm;