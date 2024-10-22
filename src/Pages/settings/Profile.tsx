import { useState } from 'react';
import { Tabs, Tab, Box, Typography, Divider } from '@mui/material';
import { CustomSettingsIcon } from '../../assets/icons';
import ChangePasswordForm from '../../components/Settings/SettingsProfile/ChangePasswordForm';
import UserProfileForm from '../../components/Settings/SettingsProfile/UserProfileForm';
import { UserData } from '../../types/Primary';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const [profile, setProfile] = useState<UserData>();

  const handleInputChange = (name: string, value: any) => {
    setProfile((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-row gap-3 items-center">
          <CustomSettingsIcon />
          <Typography className="text-3xl font-normal">Settings</Typography>
        </div>
        <Typography className="text-gray-400">
          Update your personal information, change your password, and customize your preferences.
        </Typography>
      </div>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
          <Tab label="User Details" />
          <Tab label="Password" />
        </Tabs>
      </Box>
      <Divider className="my-12" />
      <TabPanel value={value} index={0}>
        <UserProfileForm profile={profile} handleInputChange={handleInputChange} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChangePasswordForm />
      </TabPanel>
    </div>
  );
};

export default Profile;
