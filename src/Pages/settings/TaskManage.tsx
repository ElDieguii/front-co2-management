/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { fetchTotalUsers } from '../../services/UsersFunctions';
import { Typography, Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomToaster from '../../components/Toaster';
import TaskForm from '../../components/Settings/TaskManagament/TaskForm';
import TaskManageTable from '../../components/Settings/TaskManagament/TaskManageTable';
import { CustomTaskManagementIcon } from '../../assets/icons';
import { InitialTasks } from '../../constants';
import { useAuthContext } from '../../hooks/AuthContext';

const TaskManage = () => {
  const { token } = useAuthContext();

  const [taskData, setTaskData] = useState<any | null>(InitialTasks);
  const [users, setUsers] = useState<any[] | null>(null);

  const [showTaskForm, setShowTaskForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingTask, setLoadingTask] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleTextChange = (path: string, value: any) => {
    setTaskData((prevState: any) => {
      const keys = path.split('.');
      const newState = { ...prevState };

      let currentLevel: any = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!currentLevel[keys[i]]) {
          currentLevel[keys[i]] = {};
        }
        currentLevel = currentLevel[keys[i]];
      }

      currentLevel[keys[keys.length - 1]] = value;

      return newState;
    });
  };

  const handleCreateUser = () => {
    setShowTaskForm(true);
  };

  const handleBackToTable = () => {
    setShowTaskForm(false);
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSubmitUser = async (event: any) => {
    event?.preventDefault();
    if (taskData) {
      setLoadingTask(true);
      try {
        if (taskData._id) {
          // await updateTask(auth, taskData);
          showToast('success', 'The Task was updated successfully');
        } else {
          // await addTask(auth, taskData);
          showToast('success', 'The Task was created successfully');
        }
      } catch (error) {
        console.log(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoadingTask(false);
        setShowTaskForm(false);
      }
    }
  };

  const handleDelete = async (_task: any, handleMenuClose: any) => {
    try {
      // await deleteTask(auth, task._id);
      showToast('success', 'The task was deleted successfully');
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    } finally {
      handleMenuClose();
    }
  };

  const handleEditTask = (task: any) => {
    setTaskData(task);
    setShowTaskForm(true);
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await fetchTotalUsers(token);
      setUsers(res.data);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!users) {
      getUsers();
    }
  }, []);

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CustomTaskManagementIcon />
            <Typography className="text-3xl font-normal">Task Management</Typography>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              className="normal-case px-6 py-3"
              onClick={handleCreateUser}
              disabled={showTaskForm}
            >
              New Task
            </Button>
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          Organize and manage your tasks efficiently. Create new tasks, set deadlines, and track progress to stay on top
          of your projects.
        </Typography>
      </div>
      <Divider className="mt-12 mb-9" />
      {showTaskForm ? (
        <TaskForm
          taskData={taskData}
          users={users}
          handleTextChange={handleTextChange}
          handleSubmitUser={handleSubmitUser}
          handleBackToTable={handleBackToTable}
          loadingTask={loadingTask}
        />
      ) : (
        <TaskManageTable tasks={taskData} loading={loading} handleDelete={handleDelete} handleEdit={handleEditTask} />
      )}
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default TaskManage;
