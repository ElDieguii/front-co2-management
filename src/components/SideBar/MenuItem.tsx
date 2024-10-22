import { useState } from 'react';
import { ListItemIcon, ListItemText, ListItemButton, Collapse, Box, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../hooks/AuthContext';

interface MenuItemProps {
  name: string;
  icon: React.ReactNode;
  link?: string;
  children?: MenuItemProps[];
  paddingClass?: string;
}

const isActiveRoute = (location: any, link: any, children: any) => {
  if (location.pathname === link) {
    return true;
  }
  if (children) {
    return children.some((child: any) => isActiveRoute(location, child.link, child.children));
  }
  return false;
};

const MenuItem = ({ name, icon, link = '#', children, paddingClass = 'pl-4' }: MenuItemProps) => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = isActiveRoute(location, link, children);

  const handleClick = () => {
    if (children) setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        component={Link}
        to={link}
        onClick={handleClick}
        selected={isActive}
        className={`${isActive ? 'bg-blue-200' : ''} hover:bg-blue-200 ${paddingClass}`}
        disabled={!user?.company}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={name} />
        {children && (open ? <ExpandLess /> : <ExpandMore />)}
      </ListItemButton>
      {children && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>
            <List component="div" disablePadding>
              {children.map((child, index) => (
                <MenuItem key={index} {...child} paddingClass="pl-6" />
              ))}
            </List>
          </Box>
        </Collapse>
      )}
    </>
  );
};

export default MenuItem;
