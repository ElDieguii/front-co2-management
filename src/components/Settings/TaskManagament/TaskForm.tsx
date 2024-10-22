import { FC } from 'react';
import LabelForm from '../../LabelForm';
import { Button, Grid, MenuItem, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { PriorityTypes, StatusTaskTypes } from '../../../constants';

const TaskForm: FC<any> = ({
  taskData,
  users,
  handleTextChange,
  handleSubmitUser,
  handleBackToTable,
  loadingTask,
}: any) => {
  return (
    <div>
      <Typography className="text-xl font-medium mb-6">{taskData?._id ? 'Update Task' : 'Create New Task'}</Typography>
      <form onSubmit={handleSubmitUser}>
        <Grid container spacing={3} className="mb-6">
          <Grid item xs={6}>
            <LabelForm label="Task Name" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="first name"
              className="mt-1"
              fullWidth
              required
              value={taskData?.name || ''}
              onChange={(e: any) => handleTextChange('name', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Due Date" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="date"
              className="mt-1"
              type="date"
              fullWidth
              required
              value={taskData?.date || ''}
              onChange={(e: any) => handleTextChange('date', e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Priority" required={true} hasInfo={true} />
            <Select
              size="small"
              placeholder="priority"
              className="mt-1"
              fullWidth
              value={taskData?.priority || ''}
              onChange={(e: any) => handleTextChange('priority', e.target.value)}
            >
              {PriorityTypes?.map((priority: any, index: any) => (
                <MenuItem key={index} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Assignment" hasInfo={true} />
            <Select
              size="small"
              placeholder="assign"
              className="mt-1"
              fullWidth
              value={taskData?.assignment || ''}
              onChange={(e: any) => handleTextChange('assignment', e.target.value)}
            >
              {users &&
                users?.map((user: any) => (
                  <MenuItem key={user._id} value={user._id}>
                    {user.email}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Status" hasInfo={true} />
            <Select
              size="small"
              placeholder="status"
              className="mt-1"
              fullWidth
              value={taskData?.status || ''}
              onChange={(e: any) => handleTextChange('status', e.target.value)}
            >
              {StatusTaskTypes?.map((status: any, index: any) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <LabelForm label="Task Description" hasInfo={true} />
            <TextareaAutosize
              style={{
                maxWidth: '98%',
                minWidth: '98%',
                minHeight: '20px',
                borderRadius: 10,
                padding: 10,
              }}
              className="mt-1 border-gray-300 hover:border-black"
              minRows={5}
              value={taskData?.description}
              onChange={(e: any) => handleTextChange('description', e.target.value)}
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
            className="bg-blue-500 px-6 py-3 normal-case"
            startIcon={taskData?._id ? <EditIcon /> : <AddIcon />}
            disabled
            loading={loadingTask}
          >
            {taskData?._id ? 'Update Task' : 'Add Task'}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
