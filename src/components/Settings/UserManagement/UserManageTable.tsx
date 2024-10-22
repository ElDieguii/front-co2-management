import { UploadFile, GroupAdd } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import LabelForm from '../../LabelForm';
import UserGroupTable from './Tables/UserGroupTable';
import UsersTable from './Tables/UsersTable';

const UserManageTable = ({
  users,
  selectedUsers,
  loading,
  handleCheckboxChange,
  handleGroupSubmit,
  groupName,
  setGroupName,
  groups,
  handleDelete,
  handleEdit,
}: any) => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center mb-6">
        <Typography className="text-xl font-medium">List of Users</Typography>
        <Button variant="outlined" startIcon={<UploadFile />} className="normal-case px-6 py-3" disabled>
          Excel
        </Button>
      </div>
      <UsersTable
        users={users}
        selectedUsers={selectedUsers}
        loading={loading}
        handleCheckboxChange={handleCheckboxChange}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
      <form onSubmit={handleGroupSubmit}>
        <Grid container spacing={3} className="flex flex-row justify-between items-end mt-12">
          <Grid item xs={6}>
            <LabelForm label="Group Name" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="Group Name"
              className="mt-1"
              fullWidth
              required
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </Grid>
          <Button type="submit" variant="contained" startIcon={<GroupAdd />} className="bg-blue-500 px-6 py-3">
            Create Group
          </Button>
        </Grid>
      </form>
      {groups && <UserGroupTable groups={groups} />}
    </div>
  );
};

export default UserManageTable;
