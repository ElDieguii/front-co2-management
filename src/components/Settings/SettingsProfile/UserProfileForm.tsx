import { Avatar, Button, Grid, TextField, Typography } from '@mui/material';
import LabelForm from '../../LabelForm';

const UserProfileForm = ({ profile, handleInputChange }: any) => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Add form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row items-center mb-6">
        <Avatar alt="User Photo" src="/static/images/avatar/1.jpg" sx={{ width: 64, height: 64 }} />
        <div className="flex flex-col gap-1 items-start ml-4">
          <Typography className="text-gray-400">Select your photo up to 5 mb</Typography>
          <Button variant="text" className="bg-[#37a2db2a] normal-case text-[#37A1DB] w-1/4  px-10">
            Upload
          </Button>
        </div>
      </div>
      <Grid container spacing={3} className="mt-6">
        <Grid item xs={6}>
          <LabelForm label="First Name" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="First Name"
            className="mt-1"
            fullWidth
            required
            value={profile?.firstName}
            onChange={(e: any) => handleInputChange('firstName', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Surname" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Surname"
            className="mt-1"
            fullWidth
            required
            value={profile?.surName}
            onChange={(e: any) => handleInputChange('lastName', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Email Adress" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Email"
            className="mt-1"
            fullWidth
            required
            value={profile?.email}
            onChange={(e: any) => handleInputChange('email', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Phone Number" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Number"
            className="mt-1"
            fullWidth
            required
            value={profile?.phoneNumber}
            onChange={(e: any) => handleInputChange('phoneNumber', e.target.value)}
          />
        </Grid>

        <Grid item xs={6}>
          <LabelForm label="Role" required={true} hasInfo={true} />
          <TextField
            size="small"
            placeholder="Role"
            className="mt-1"
            fullWidth
            required
            value={profile?.role}
            onChange={(e: any) => handleInputChange('role', e.target.value)}
            disabled
          />
        </Grid>
        <Grid item xs={6} className="flex items-center justify-end">
          <Button variant="contained" color="primary" className="mt-6 px-16 normal-case">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserProfileForm;
