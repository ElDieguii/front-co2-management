import {
  Autocomplete,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
  TextareaAutosize,
} from '@mui/material';
import LabelForm from '../../LabelForm';
import { FC } from 'react';
import { RegionCodes } from '../../../constants/ClimatiQ';
import { CompanyData, UserData } from '../../../types/Primary';

interface companyProps {
  companyData: CompanyData | null;
  user: UserData | null;
  loading: boolean;
  handleInputChange: (name: string, value: any) => void;
  handleCompanyData: (companyData: CompanyData | null) => void;
}

const CompanyForm: FC<companyProps> = ({ companyData, user, loading, handleInputChange, handleCompanyData }) => {
  const handleSubmit = (event: any) => {
    event?.preventDefault();
    handleCompanyData(companyData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} className="mt-6">
        <Grid item xs={12}>
          <Grid item xs={5.88}>
            <LabelForm label="Report Title " required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="Report Title"
              className="mt-1"
              fullWidth
              required
              value={companyData?.reportTitle || ''}
              onChange={(e: any) => handleInputChange('reportTitle', e.target.value)}
              disabled={user?.role !== 'admin'}
            />
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Observation Period" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Observation Period"
            className="mt-1"
            required
            fullWidth
            type="date"
            value={companyData?.observationPeriod || ''}
            onChange={(e) => handleInputChange('observationPeriod', e.target.value)}
            disabled={user?.role !== 'admin'}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Observation Period End" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Observation Period End"
            className="mt-1"
            required
            fullWidth
            type="date"
            value={companyData?.observationEnd || ''}
            onChange={(e) => handleInputChange('observationEnd', e.target.value)}
            disabled={user?.role !== 'admin'}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Region" required={true} hasInfo={true} />
          <Autocomplete
            size="small"
            className="mt-1"
            value={RegionCodes.find((item) => item.name === companyData?.region) || null}
            onChange={(_event, newValue) => handleInputChange('region', newValue ? newValue.name : '')}
            options={RegionCodes}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField {...params} required fullWidth placeholder="Region" disabled={user?.role !== 'admin'} />
            )}
            disabled={user?.role !== 'admin'}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Number of Employees" />
          <TextField
            size="small"
            placeholder="Number of Employees"
            className="mt-1"
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            value={companyData?.numEmployees || ''}
            onChange={(e: any) => handleInputChange('numEmployees', e.target.value)}
            disabled={user?.role !== 'admin'}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelForm label="Annual Income" />
          <TextField
            size="small"
            placeholder="Annual Income"
            className="mt-1"
            fullWidth
            type="number"
            inputProps={{ min: 0 }}
            value={companyData?.annualSales || ''}
            onChange={(e: any) => handleInputChange('annualSales', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">€</InputAdornment>,
            }}
            disabled={user?.role !== 'admin'}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Annual Growth" />
          <TextField
            size="small"
            placeholder="Annual Growth"
            className="mt-1"
            fullWidth
            type="number"
            value={companyData?.annualGrowth || ''}
            onChange={(e: any) => handleInputChange('annualGrowth', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            disabled={user?.role !== 'admin'}
          />
        </Grid>
        <Grid item xs={12}>
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
            minRows={5}
            value={companyData?.description || ''}
            onChange={(e: any) => handleInputChange('description', e.target.value)}
            disabled={user?.role !== 'admin'}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="mt-2">
            <Button variant="contained" fullWidth type="submit" disabled={user?.role !== 'admin'}>
              Save Company
            </Button>
          </div>
        </Grid>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Grid>
    </form>
  );
};

export default CompanyForm;
