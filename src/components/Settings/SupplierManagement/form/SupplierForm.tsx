import { FC, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { TextField, Typography, Grid, Button, IconButton, InputAdornment } from '@mui/material';
import LabelForm from '../../../LabelForm';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { UserAddLineIcon } from '../../../../assets/icons';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface Props {
  supplierData: any;
  handleTextChange: any;
  handleSubmitSupplier: any;
  handleBackToTable: any;
  loadingSupplier: any;
}

const SupplierForm: FC<Props> = ({
  supplierData,
  handleTextChange,
  handleSubmitSupplier,
  handleBackToTable,
  loadingSupplier,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDownPassword = (event: any) => event.preventDefault();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  return (
    <div>
      <div className="flex flex-row gap-4">
        <UserAddLineIcon />
        <Typography className="text-xl font-medium mb-6">
          {supplierData?._id ? 'Update Supplier' : 'Create New Supplier'}
        </Typography>
      </div>
      <form onSubmit={handleSubmitSupplier}>
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={6}>
            <LabelForm label="Company Name" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="name"
              className="mt-1"
              fullWidth
              required
              value={supplierData?.name || ''}
              onChange={(e: any) => handleTextChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Responsable" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="responsable"
              className="mt-1"
              fullWidth
              required
              value={supplierData?.responsable || ''}
              onChange={(e: any) => handleTextChange('responsable', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Company adress" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="adress"
              className="mt-1"
              fullWidth
              required
              value={supplierData?.adress || ''}
              onChange={(e: any) => handleTextChange('adress', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Country" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="country"
              className="mt-1"
              fullWidth
              required
              value={supplierData?.country || ''}
              onChange={(e: any) => handleTextChange('country', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="E-mail" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="email"
              className="mt-1"
              type="email"
              fullWidth
              required
              value={supplierData?.email || ''}
              onChange={(e: any) => handleTextChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Password" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="password"
              className="mt-1"
              fullWidth
              required
              type={showPassword ? 'text' : 'password'}
              value={supplierData?.password || ''}
              onChange={(e: any) => handleTextChange('password', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Phone number" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="phone number"
              className="mt-1"
              type="number"
              fullWidth
              required
              value={supplierData?.phoneNumber || ''}
              onChange={(e: any) => handleTextChange('phoneNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Role" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="role"
              className="mt-1"
              fullWidth
              required
              value={supplierData?.role || ''}
              onChange={(e: any) => handleTextChange('role', e.target.value)}
            />
          </Grid>
        </Grid>
        <div className="flex flex-row justify-end gap-5 mt-10">
          <Button variant="outlined" className="ml-4 px-6 py-3 normal-case" onClick={handleBackToTable}>
            Back
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            className="px-6 py-3 normal-case"
            startIcon={supplierData?._id ? <EditIcon /> : <AddIcon />}
            disabled
            loading={loadingSupplier}
          >
            {supplierData?._id ? 'Update Supplier' : 'Create Supplier'}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
