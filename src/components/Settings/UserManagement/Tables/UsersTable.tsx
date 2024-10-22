import { FC, useState, MouseEvent } from 'react';
import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Backdrop,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserData } from '../../../../types/Primary';

interface UsersTableProps {
  handleCheckboxChange: (index: number) => void;
  users: UserData[] | null;
  selectedUsers: { [key: number]: boolean };
  loading: boolean;
  handleDelete: (user: any, handleMenuClose: any) => void;
  handleEdit: any;
}

const UsersTable: FC<UsersTableProps> = ({
  handleCheckboxChange,
  users,
  selectedUsers,
  loading,
  handleDelete,
  handleEdit,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);

  const handleMenuClick = (event: MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setMenuIndex(index);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuIndex(null);
  };

  const handleEditClick = () => {
    if (menuIndex !== null && users) {
      handleEdit(users[menuIndex]);
    }
    handleMenuClose();
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        '& th, & td': {
          border: 'none',
        },
        position: 'relative',
      }}
      className="shadow-md rounded-lg"
    >
      {loading && (
        <Backdrop
          sx={{
            color: '#fff',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Table sx={{ border: 0 }}>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="w-12"></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role Type</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Company</TableCell>
            <TableCell className="w-12"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>
                  <Checkbox checked={!!selectedUsers[index]} onChange={() => handleCheckboxChange(index)} />
                </TableCell>
                <TableCell>{user.firstName || '-'}</TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>{user.status || '-'}</TableCell>
                <TableCell>{user.role_type || '-'}</TableCell>
                <TableCell>{user.role || '-'}</TableCell>
                <TableCell>{user.company?.companyName || '-'}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuClick(event, index)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && menuIndex === index} onClose={handleMenuClose}>
                    <MenuItem onClick={handleEditClick} className="flex flex-row gap-2">
                      <EditIcon fontSize="small" color="primary" />
                      <Typography>Edit</Typography>
                    </MenuItem>
                    <MenuItem onClick={() => handleDelete(user, handleMenuClose)} className="flex flex-row gap-2">
                      <DeleteIcon fontSize="small" color="error" />
                      <Typography>Delete</Typography>
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
