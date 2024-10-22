import { FC, useState, MouseEvent } from 'react';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { InitialTasks } from '../../../../constants';

const TaskTable: FC<any> = ({ tasks, handleDelete, handleEdit }) => {
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
    if (menuIndex !== null) {
      handleEdit(InitialTasks[menuIndex]);
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
      <Table sx={{ border: 0 }}>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Assigment</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell className="w-12"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks?.map((task: any, index: any) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell>{task.name || '-'}</TableCell>
                <TableCell>{task.assignment || '-'}</TableCell>
                <TableCell>{task.date || '-'}</TableCell>
                <TableCell>{task.status || '-'}</TableCell>
                <TableCell>{task.priority || '-'}</TableCell>
                <TableCell>
                  <IconButton onClick={(event) => handleMenuClick(event, index)}>
                    <MoreVertIcon />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={Boolean(anchorEl) && menuIndex === index} onClose={handleMenuClose}>
                    <MenuItem onClick={handleEditClick} className="flex flex-row gap-2" disabled>
                      <EditIcon fontSize="small" color="primary" />
                      <Typography>Edit</Typography>
                    </MenuItem>
                    <MenuItem
                      onClick={() => handleDelete(task, handleMenuClose)}
                      className="flex flex-row gap-2"
                      disabled
                    >
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

export default TaskTable;
