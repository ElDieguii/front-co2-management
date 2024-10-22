import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { useState } from 'react';
import LabelForm from '../../LabelForm';
import { Categories, UnitsByCategory, allOptions, Years } from '../../../constants';
import { FuelTypeByCategory, RegionCodes } from '../../../constants/ClimatiQ';

const getCategoriesByFuelType = (fuelType: any) => {
  const categories: string[] = [];
  if (FuelTypeByCategory.energy.includes(fuelType)) categories.push(Categories.energy);
  if (FuelTypeByCategory.volume.includes(fuelType)) categories.push(Categories.volume);
  if (FuelTypeByCategory.weight.includes(fuelType)) categories.push(Categories.weight);
  return categories;
};

const getCombinedUnitsByCategories = (categories: string[]) => {
  const unitOptions = new Set<string>();
  categories.forEach((category) => {
    UnitsByCategory[category]?.forEach((unit: any) => unitOptions.add(unit));
  });
  return Array.from(unitOptions);
};

function FuelForm({ handleInputChange, scope2, handleDetails, showDetails, handleCalculate }: any) {
  const [categoryOptions, setCategoryOptions] = useState<string[]>([]);

  const handleFuelTypeChange = (_event: any, value: any) => {
    const originalValue: any = allOptions.find((option) => option.replace(/_/g, ' ') === value);
    handleInputChange('fuel.fuel_type', originalValue);

    const categories = getCategoriesByFuelType(originalValue);
    setCategoryOptions(categories);
  };

  const handleUnitTypeChange = (_event: any, value: any) => {
    handleInputChange('unit_type', value);
  };

  const categories = categoryOptions.length > 0 ? categoryOptions : getCategoriesByFuelType(scope2.fuel?.fuel_type);
  const unitOptions =
    categories.length > 0 ? getCombinedUnitsByCategories(categories) : UnitsByCategory[Categories.energy];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid item xs={5.9}>
          <LabelForm label="Fuel Type" required={true} hasInfo={true} />
          <Autocomplete
            freeSolo
            options={allOptions.map((option) => option.replace(/_/g, ' '))}
            value={scope2?.fuel?.fuel_type?.replace(/_/g, ' ') || ''}
            onChange={handleFuelTypeChange}
            renderInput={(params) => (
              <TextField {...params} size="small" placeholder="Type" className="mt-1" fullWidth />
            )}
          />
        </Grid>
      </Grid>
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
          options={unitOptions}
          value={scope2?.unit_type || ''}
          onChange={handleUnitTypeChange}
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

export default FuelForm;
