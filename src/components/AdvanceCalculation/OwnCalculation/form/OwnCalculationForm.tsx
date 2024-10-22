import { FC } from 'react';
import { Autocomplete, Button, Grid, TextareaAutosize, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { FuelUnits, Category_types, Years } from '../../../../constants';
import { Sources_database } from '../../../../constants/ClimatiQ';
import LabelForm from '../../../LabelForm';

interface Props {
  factor: any;
  handleInputChange: (name: any, value: any) => void;
  handleAddEmission: (_event: any) => void;
}

const OwnCalculationForm: FC<Props> = ({ factor, handleInputChange, handleAddEmission }) => {
  return (
    <form onSubmit={handleAddEmission}>
      <div className="w-full">
        <Typography variant="h6" gutterBottom className="mb-4">
          Calculation Tool
        </Typography>
        <>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <LabelForm label="Emittent" hasInfo={true} />
              <TextField
                size="small"
                placeholder="-"
                className="mt-1"
                fullWidth
                value={factor?.emittent || ''}
                onChange={(e) => handleInputChange('emittent', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="kg CO2e per unit" hasInfo={true} />
              <TextField
                size="small"
                placeholder="0"
                className="mt-1"
                fullWidth
                type="number"
                value={factor?.co2e || ''}
                onChange={(e) => handleInputChange('co2e', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="Amount" hasInfo={true} />
              <TextField
                size="small"
                placeholder="0"
                className="mt-1"
                fullWidth
                type="number"
                value={factor?.amount || ''}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="Unit Type" required={true} hasInfo={true} />
              <Autocomplete
                freeSolo
                options={FuelUnits.map((u: any) => u)}
                value={factor?.unit_type || ''}
                onInputChange={(_e, value) => handleInputChange('unit_type', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="Data Source" hasInfo={true} />
              <Autocomplete
                freeSolo
                options={Sources_database.map((s: any) => s.source)}
                value={factor?.source || ''}
                onInputChange={(_e, value) => handleInputChange('source', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="Category" hasInfo={true} />
              <Autocomplete
                freeSolo
                options={Category_types}
                value={factor?.category || ''}
                onInputChange={(_e, value) => handleInputChange('category', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="Year" hasInfo={true} />
              <Autocomplete
                freeSolo
                options={Years}
                value={factor?.year || ''}
                onInputChange={(_e, value) => handleInputChange('year', value)}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="select" className="mt-1" fullWidth />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <LabelForm label="Description" />
              <TextareaAutosize
                style={{
                  maxWidth: '98%',
                  minWidth: '98%',
                  minHeight: '20px',
                  borderRadius: 10,
                  padding: 10,
                }}
                className="mt-1 border-gray-300 hover:border-black"
                minRows={3}
                value={factor?.description || ''}
                onChange={(e: any) => handleInputChange('description', e.target.value)}
              />
            </Grid>
            <Grid item xs={4} className="flex items-center justify-end">
              <Button variant="contained" startIcon={<AddIcon />} className="normal-case px-6 py-2" type="submit">
                Add Emissions
              </Button>
            </Grid>
          </Grid>
        </>
      </div>
    </form>
  );
};

export default OwnCalculationForm;
