import { FC, useState } from 'react';
import { Grid, Button, TextField, Autocomplete } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LabelForm from '../../../LabelForm';
import { CurrencyTypes, SpendTypes } from '../../../../constants';

interface props {
  scope: any;
  handleInputChange: (key: string, value: any) => void;
  handleCalculate: () => void;
  loading: boolean;
}

const TravelBySpend: FC<props> = ({ scope, handleInputChange, handleCalculate, loading }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Grid container spacing={2} className="mt-4">
      <Grid item xs={6}>
        <LabelForm label="Expenditure" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="0"
          className="mt-1"
          type="number"
          fullWidth
          required
          value={scope?.amount}
          onChange={(e) => handleInputChange('amount', e.target.value)}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Currency" required={true} hasInfo={true} />
        <Autocomplete
          freeSolo
          options={CurrencyTypes}
          value={scope?.travel?.expenditure?.currency_type || ''}
          onInputChange={(_e, value) => handleInputChange('travel.expenditure.currency_type', value)}
          renderInput={(params) => <TextField {...params} size="small" placeholder="Type" className="mt-1" fullWidth />}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Travel Mode" required={true} hasInfo={true} />
        <Autocomplete
          freeSolo
          options={SpendTypes}
          value={scope?.travel?.expenditure?.spend_type || ''}
          onInputChange={(_e, value) => handleInputChange('travel.expenditure.spend_type', value)}
          renderInput={(params) => <TextField {...params} size="small" placeholder="Type" className="mt-1" fullWidth />}
        />
      </Grid>
      <Grid item xs={6}>
        <LabelForm label="Region" required={true} hasInfo={true} />
        <TextField
          size="small"
          placeholder="Region"
          className="mt-1"
          fullWidth
          required
          value={scope?.travel?.expenditure?.final_destination || ''}
          onChange={(e) => handleInputChange('travel.expenditure.final_destination', e.target.value)}
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
        <Grid item xs={6}>
          <LabelForm label="Year" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Year"
            className="mt-1"
            fullWidth
            required
            value={scope?.year}
            onChange={(e) => handleInputChange('year', e.target.value)}
          />
        </Grid>
      )}
      <Grid item xs={12} className="flex justify-end">
        <LoadingButton
          variant="outlined"
          className="px-10 py-2"
          onClick={handleCalculate}
          disabled={scope?.travel?.expenditure?.final_destination ? false : true}
          loading={loading}
        >
          Calculate
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default TravelBySpend;
