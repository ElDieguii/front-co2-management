import { useState } from 'react';
import { Button, Grid, IconButton, InputAdornment, MenuItem, Select, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import LabelForm from '../../LabelForm';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { StatusTypes } from '../../../constants';

const UserForm = ({
  userData,
  companiesData,
  handleTextChange,
  handleSubmitUser,
  handleBackToTable,
  loadingUser,
}: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <Typography className="text-xl font-medium mb-6">{userData?._id ? 'Update User' : 'Create New User'}</Typography>
      <form onSubmit={handleSubmitUser}>
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={6}>
            <LabelForm label="First Name" required={true} hasInfo={true} />
            <TextField
              autoComplete="username"
              size="small"
              placeholder="first name"
              className="mt-1"
              fullWidth
              required
              value={userData?.firstName || ''}
              onChange={(e: any) => handleTextChange('firstName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Last Name" hasInfo={true} />
            <TextField
              size="small"
              placeholder="last name"
              className="mt-1"
              fullWidth
              value={userData?.lastName || ''}
              onChange={(e: any) => handleTextChange('lastName', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Email adress" required={true} hasInfo={true} />
            <TextField
              autoComplete="email"
              type="email"
              size="small"
              placeholder="email"
              className="mt-1"
              fullWidth
              required
              value={userData?.email || ''}
              onChange={(e: any) => handleTextChange('email', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Password" required={true} hasInfo={true} />
            <TextField
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              size="small"
              placeholder="password"
              className="mt-1"
              fullWidth
              required
              value={userData?.password || ''}
              onChange={(e: any) => handleTextChange('password', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Phone Number" hasInfo={true} />
            <TextField
              size="small"
              placeholder="number"
              className="mt-1"
              type="number"
              fullWidth
              value={userData?.phoneNumber || ''}
              onChange={(e: any) => handleTextChange('phoneNumber', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Role Type" hasInfo={true} />
            <TextField
              size="small"
              placeholder="role"
              className="mt-1"
              fullWidth
              value={userData?.role_type || ''}
              onChange={(e: any) => handleTextChange('role_type', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Status" hasInfo={true} />
            <Select
              size="small"
              placeholder="status"
              className="mt-1"
              fullWidth
              value={userData?.status || ''}
              onChange={(e: any) => handleTextChange('status', e.target.value)}
            >
              {StatusTypes?.map((status: any, index: any) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Company" required={true} hasInfo={true} />
            <Select
              size="small"
              className="mt-1"
              fullWidth
              value={userData?.company?._id || ''}
              onChange={(e: any) => handleTextChange('company._id', e.target.value)}
            >
              {companiesData?.map((company: any, index: any) => (
                <MenuItem key={index} value={company._id}>
                  {company.companyName}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>
        <div className="flex flex-row justify-end gap-5 mt-10">
          <Button variant="outlined" className="ml-4 px-6 py-3 normal-case" onClick={handleBackToTable}>
            Back
          </Button>
          <LoadingButton
            variant="contained"
            type="submit"
            className="bg-blue-500 px-6 py-3 normal-case"
            startIcon={userData?._id ? <EditIcon /> : <AddIcon />}
            loading={loadingUser}
          >
            {userData?._id ? 'Update User' : 'Add User'}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
