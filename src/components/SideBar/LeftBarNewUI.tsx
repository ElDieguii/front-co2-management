import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Images/logo.svg';
import MenuItem from './MenuItem';
import { navbarMenuConfig, navbarScopesConfig } from './MenuConfig';
import { AddCircle } from '@mui/icons-material';
import { Divider } from 'antd';
import { CustomUpgradeIcon, CustomLogOutIcon } from '../../assets/icons';
import { useAuthContext } from '../../hooks/AuthContext';

const LeftBarNewUI = () => {
  const { signOut, user } = useAuthContext();
  const navigate = useNavigate();

  const handleClickButton = () => {
    navigate('/company');
  };

  const handleClickLogOut = () => {
    signOut();
    navigate('/login');
  };

  const handleUpgradeClick = () => {
    navigate('/pricing');
  };

  return (
    <Drawer
      sx={{
        width: 280,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 280,
          boxSizing: 'border-box',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <div>
        <div className="flex flex-col items-start mt-8 mb-4">
          <img src={logo} alt="Logo" className="ml-6 w-40 mb-14" />
        </div>

        <List>
          <ListItemButton
            onClick={handleClickButton}
            className="bg-[#37A1DB] mx-6 text-white mb-4 rounded-md"
            disabled={!user?.company}
          >
            <ListItemIcon>
              <AddCircle className="text-white" />
            </ListItemIcon>
            <ListItemText primary="New Report" />
          </ListItemButton>

          {navbarScopesConfig.map((menuItem, index) => {
            return <MenuItem key={index} {...menuItem} />;
          })}

          <Divider className="my-2" />

          {navbarMenuConfig.map((menuItem, index) => {
            const showItemList = menuItem.isAdmin ? user?.role === 'admin' : true;
            return showItemList ? <MenuItem key={index} {...menuItem} /> : null;
          })}

          <ListItemButton
            onClick={handleUpgradeClick}
            className="-bottom-40 mx-6 text-white bg-[#37A1DB] rounded-md"
            disabled={!user?.company}
          >
            <ListItemIcon>
              <CustomUpgradeIcon className="text-white" />
            </ListItemIcon>
            <ListItemText primary="Upgrade Plan" />
          </ListItemButton>

          <ListItemButton onClick={handleClickLogOut} className="-bottom-56 ">
            <ListItemIcon>
              <CustomLogOutIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </List>
      </div>
    </Drawer>
  );
};

export default LeftBarNewUI;
