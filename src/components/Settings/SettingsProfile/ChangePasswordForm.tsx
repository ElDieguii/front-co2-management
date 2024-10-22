import { FC, FormEvent, MouseEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Grid } from '@mui/material';
import LabelForm from '../../LabelForm';

const ChangePasswordForm: FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3} className="mt-6">
        <Grid item xs={12}>
          <Grid item xs={5.89}>
            <LabelForm label="Current Password" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="Password"
              className="mt-1"
              fullWidth
              required
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="New Password" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="New Password"
            className="mt-1"
            fullWidth
            required
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowNewPassword} onMouseDown={handleMouseDownPassword}>
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            helperText="Your new password must be 8 - 12 characters long"
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Re-enter your new password" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Re-enter your new password"
            className="mt-1"
            fullWidth
            required
            type={'password'}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} className="flex justify-end">
          <Button type="submit" variant="contained" color="primary" className="py-2 normal-case">
            Change Password
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ChangePasswordForm;
