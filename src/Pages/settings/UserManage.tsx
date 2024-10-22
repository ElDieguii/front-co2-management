import { useEffect, useState } from 'react';
import { fetchAllCompanies } from '../../services/CompanyFunctions';
import { addUser, deleteUser, fetchTotalUsers, updateUser } from '../../services/UsersFunctions';
import { PersonAdd } from '@mui/icons-material';
import { Typography, Button, Divider } from '@mui/material';
import { CustomUserManagementIcon } from '../../assets/icons';
import UserForm from '../../components/Settings/UserManagement/UserForm';
import CustomToaster from '../../components/Toaster';
import UserManageTable from '../../components/Settings/UserManagement/UserManageTable';
import { useAuthContext } from '../../hooks/AuthContext';
import { UserData, CompanyData } from '../../types/Primary';

const UserManage = () => {
  const { token } = useAuthContext();

  const [userData, setUserData] = useState<UserData | null>(null);
  const [users, setUsers] = useState<UserData[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<{ [key: number]: boolean }>({});
  const [companiesData, setCompaniesData] = useState<CompanyData[] | null>(null);

  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<any>([]);
  const [showUserForm, setShowUserForm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleTextChange = (path: string, value: any) => {
    setUserData((prevState: any) => {
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

  const handleCheckboxChange = (index: number) => {
    setSelectedUsers((prevSelectedUsers) => ({
      ...prevSelectedUsers,
      [index]: !prevSelectedUsers[index],
    }));
  };

  const handleGroupSubmit = (event: any) => {
    event.preventDefault();
    const selectedIndexes = Object.keys(selectedUsers).filter((key) => selectedUsers[Number(key)]);
    const selectedUsersList = users?.filter((_user, index) => selectedIndexes.includes(index.toString()));
    if (selectedUsersList && selectedUsersList.length > 0 && groupName.trim() !== '') {
      setGroups([...groups, { name: groupName, suppliers: selectedUsersList }]);
      setGroupName('');
    }
  };

  const handleCreateUser = () => {
    setUserData(null);
    setShowUserForm(true);
  };

  const handleBackToTable = () => {
    setShowUserForm(false);
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSubmitUser = async (event: any) => {
    event?.preventDefault();
    if (userData) {
      setLoadingUser(true);
      try {
        if (userData._id) {
          await updateUser(token, userData);
          showToast('success', 'The user was updated successfully');
        } else {
          await addUser(token, userData);
          showToast('success', 'The user was created successfully');
        }
      } catch (error) {
        console.log(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoadingUser(false);
        setShowUserForm(false);
        getUsers();
      }
    }
  };

  const handleDelete = async (user: any, handleMenuClose: any) => {
    try {
      await deleteUser(token, user._id);
      showToast('success', 'The user was deleted successfully');
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    } finally {
      handleMenuClose();
      getUsers();
    }
  };

  const handleEditUser = (user: UserData) => {
    setUserData(user);
    setShowUserForm(true);
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

  const getCompanyData = async () => {
    try {
      const res = await fetchAllCompanies(token);
      setCompaniesData(res.data);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    }
  };

  useEffect(() => {
    if (!users) {
      getUsers();
    }
    if (!companiesData) {
      getCompanyData();
    }
  }, []);

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CustomUserManagementIcon />
            <Typography className="text-3xl font-normal">User Management</Typography>
          </div>
          <div className="flex flex-row gap-4">
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              className="normal-case px-6 py-3"
              onClick={handleCreateUser}
              disabled={showUserForm}
            >
              Add User
            </Button>
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          Manage all user accounts with ease. Add new users, update roles and permissions, and ensure secure access to
          your system.
        </Typography>
      </div>
      <Divider className="mt-12 mb-9" />
      {showUserForm ? (
        <UserForm
          userData={userData}
          companiesData={companiesData}
          handleTextChange={handleTextChange}
          handleSubmitUser={handleSubmitUser}
          handleBackToTable={handleBackToTable}
          loadingUser={loadingUser}
        />
      ) : (
        <UserManageTable
          users={users}
          selectedUsers={selectedUsers}
          loading={loading}
          handleCheckboxChange={handleCheckboxChange}
          handleGroupSubmit={handleGroupSubmit}
          groupName={groupName}
          setGroupName={setGroupName}
          groups={groups}
          handleDelete={handleDelete}
          handleEdit={handleEditUser}
        />
      )}
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default UserManage;
