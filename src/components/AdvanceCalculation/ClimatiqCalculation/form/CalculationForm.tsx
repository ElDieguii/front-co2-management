import { FC, useState } from 'react';
import { Search } from '../ClimatiQCalculation';
import { Autocomplete, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { CustomSearchIcon, CustomFilterIcon, CustomEyeIcon } from '../../../../assets/icons';
import { Years } from '../../../../constants';
import { RegionCodes, Sources_database, Unit_types } from '../../../../constants/ClimatiQ';
import LabelForm from '../../../LabelForm';

interface Props {
  search: Search | null;
  posibleFilters: any;
  handleInputChange: (name: any, value: any) => void;
  handleCallback: any;
}

const CalculationForm: FC<Props> = ({ search, posibleFilters, handleInputChange, handleCallback }) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleShowFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <form onSubmit={handleCallback}>
      <Typography variant="h6" gutterBottom className="mb-4">
        Calculation Tool
      </Typography>
      <>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-4 w-3/4">
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search..."
              value={search?.emittent || ''}
              onChange={(e) => handleInputChange('emittent', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CustomSearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" onClick={handleShowFilters} className="p-4">
              <CustomFilterIcon fontSize="small" />
            </Button>
          </div>
          <div className="flex justify-end w-1/4">
            <Button variant="contained" startIcon={<CustomEyeIcon />} className="normal-case px-14 py-3" type="submit">
              View results
            </Button>
          </div>
        </div>
        {showFilters && (
          <Grid container spacing={2} className="my-6">
            <Grid item xs={3}>
              <LabelForm label="Region" hasInfo={true} />
              <Autocomplete
                key={search?.region}
                value={RegionCodes.find((item) => item.id === search?.region) || null}
                onChange={(_event, newValue) => handleInputChange('region', newValue ? newValue.id : '')}
                options={posibleFilters?.region || RegionCodes}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="Region" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <LabelForm label="Year" hasInfo={true} />
              <Autocomplete
                freeSolo
                options={posibleFilters?.year || Years}
                value={search?.year || ''}
                onInputChange={(_e, value) => handleInputChange('year', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <LabelForm label="Source" hasInfo={true} />
              <Autocomplete
                freeSolo
                options={
                  posibleFilters?.source?.map((s: any) => s.source) || Sources_database.map((s: any) => s.source)
                }
                value={search?.source || ''}
                onInputChange={(_e, value) => handleInputChange('source', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={3}>
              <LabelForm label="Unit Type" required={true} hasInfo={true} />
              <Autocomplete
                freeSolo
                options={posibleFilters?.unit_type?.map((u: any) => u) || Unit_types.map((u: any) => u.unit_type)}
                value={search?.unit_type || ''}
                onInputChange={(_e, value) => handleInputChange('unit_type', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
          </Grid>
        )}
      </>
    </form>
  );
};

export default CalculationForm;
