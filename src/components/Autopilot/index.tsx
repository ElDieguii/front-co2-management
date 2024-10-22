import { FC, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { TextField, Autocomplete, Grid, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import LabelForm from '../LabelForm';
import { Categories, Domains_types, Years } from '../../constants';
import { Unit_types, RegionCodes } from '../../constants/ClimatiQ';

interface props {
  scope: any;
  handleInputChange: (key: string, value: any) => void;
  handleCalculate: () => void;
  loading: boolean;
  label: string;
}

const EstimateForm: FC<props> = ({ scope, handleInputChange, handleCalculate, loading, label }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [unitType, setUnitType] = useState('');
  const [units, setUnits] = useState<string[]>([]);
  const allowedUnitTypes = [Categories.weight, Categories.volume, Categories.money, Categories.number];

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleUnitTypeChange = (_event: any, newUnitType: string) => {
    if (newUnitType) {
      setUnitType(newUnitType);

      if (newUnitType === Categories.number) {
        handleInputChange('unit_type', 'number');
      }

      const selectedUnit = Unit_types.find((unit) => unit.unit_type === newUnitType);
      const availableUnits = selectedUnit ? Object.values(selectedUnit.units).flat() : [];
      setUnits(availableUnits);
    }
  };

  useEffect(() => {
    handleUnitTypeChange(null, Categories.weight);
  }, []);

  return (
    <Grid container spacing={2} className="mt-4">
      <Grid item xs={6}>
        <LabelForm label={label} required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="-"
          className="mt-1"
          fullWidth
          required
          value={scope?.emittent || ''}
          onChange={(e) => handleInputChange('emittent', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Amount" required={true} hasInfo={true} />
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
      <Grid item xs={6}>
        <LabelForm label="Unit Type" required={true} hasInfo={true} />
        <ToggleButtonGroup value={unitType} exclusive onChange={handleUnitTypeChange} fullWidth className="mt-1">
          {allowedUnitTypes.map((type) => (
            <ToggleButton key={type} value={type}>
              {type}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Grid>
      {units.length > 0 && (
        <Grid item xs={6}>
          <LabelForm label="Select Unit" required={true} hasInfo={true} />
          <Autocomplete
            freeSolo
            options={units}
            value={scope?.unit || ''}
            onInputChange={(_e, value) => handleInputChange('unit_type', value)}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="Select unit" className="mt-1" fullWidth />
            )}
          />
        </Grid>
      )}
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
            <LabelForm label="Domain" required={true} hasInfo={true} />
            <Autocomplete
              freeSolo
              options={Domains_types}
              value={scope?.domain || 'general'}
              onInputChange={(_e, value) => handleInputChange('domain', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="Domain" className="mt-1" fullWidth />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Region" required={true} hasInfo={true} />
            <Autocomplete
              key={scope?.region}
              value={RegionCodes.find((item) => item.id === scope?.region) || null}
              onChange={(_event, newValue) => handleInputChange('region', newValue ? newValue.id : '')}
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
              value={scope?.year || ''}
              onInputChange={(_e, value) => handleInputChange('year', value)}
              renderInput={(params) => (
                <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
              )}
            />
          </Grid>
        </>
      )}
      <Grid item xs={12} className="flex justify-end pt-4">
        <LoadingButton variant="contained" className="px-10 py-2" onClick={handleCalculate} loading={loading}>
          Calculate
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default EstimateForm;
