import { MouseEvent, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  Divider,
  ListItemIcon,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Settings, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import {
  CustomArrowDownIcon,
  CustomUserManagementIcon,
  CustomBillingIcon,
  CustomCompanyIcon,
  CustomFacilityIcon,
  CustomProductIcon,
} from '../../assets/icons';
import { useAuthContext } from '../../hooks/AuthContext';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const TabLabel = ({ icon: Icon, label }: any) => {
  return (
    <div className="flex flex-row items-center gap-1">
      <Icon fontSize="small" />
      <Typography className="normal-case text-md">{label}</Typography>
      <CustomArrowDownIcon fontSize="small" />
    </div>
  );
};

const HeaderNewUI = ({ children }: any) => {
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [value, setValue] = useState(0);
  const open = Boolean(anchorEl);

  const handleChange = (_event: any, newValue: any) => {
    setValue(newValue);
  };

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    signOut();
    navigate('/login');
  };

  const handleBilling = () => {
    navigate('/pricing');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleSettings = () => {
    handleClose();
  };

  return (
    <AppBar position="static" color="transparent" elevation={0} className="w-full">
      <Box className="w-full">
        <div className="flex flex-row justify-between items-center mt-10 mb-6">
          <div className="flex items-center pl-4">
            <Typography variant="h4" className="font-medium" noWrap>
              Company 1
            </Typography>
          </div>
          <div className="relative flex items-center mx-20">
            <Avatar src={user?.imageUrl} alt="Profile Picture" className="mr-2" />
            <span className="font-medium">{user?.email ?? ''}</span>
            <IconButton aria-controls="simple-menu" aria-haspopup="true" className="ml-2" onClick={handleClick}>
              <CustomArrowDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleProfile}>
                <ListItemIcon>
                  <CustomUserManagementIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleBilling}>
                <ListItemIcon>
                  <CustomBillingIcon fontSize="small" />
                </ListItemIcon>
                Account & Billing
              </MenuItem>
              <MenuItem onClick={handleSettings}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogOut}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
            <div className="absolute top-[4.8rem] left-0 z-10 w-full">
              <TextField
                placeholder="Search..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '0',
                    backgroundColor: 'transparent',
                    paddingRight: '8px',
                    paddingLeft: '8px',
                    '&:hover fieldset': {
                      borderColor: 'transparent',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'transparent',
                    },
                    '& fieldset': {
                      borderColor: 'transparent',
                    },
                  },
                }}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="mb-6">
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label={<TabLabel icon={CustomCompanyIcon} label="Company" value={value} />} className="justify-end" />
            <Tab
              label={<TabLabel icon={CustomFacilityIcon} label="Facility" value={value} />}
              className="justify-end"
              disabled
            />
            <Tab
              label={<TabLabel icon={CustomProductIcon} label="Product" value={value} />}
              className="justify-end"
              disabled
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {children}
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </Box>
      <Toolbar className="flex justify-between"></Toolbar>
    </AppBar>
  );
};

export default HeaderNewUI;
