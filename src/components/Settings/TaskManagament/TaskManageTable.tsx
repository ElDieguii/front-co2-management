import { FC } from 'react';
import { UploadFile } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import TaskTable from './Tables/TasksTable';

const TaskManageTable: FC<any> = ({ tasks, loading, handleDelete, handleEdit }: any) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-6">
        <Typography className="text-xl font-medium">Tasks</Typography>
        <Button variant="outlined" startIcon={<UploadFile />} className="normal-case px-6 py-3" disabled>
          Excel
        </Button>
      </div>
      <TaskTable tasks={tasks} loading={loading} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
};

export default TaskManageTable;
