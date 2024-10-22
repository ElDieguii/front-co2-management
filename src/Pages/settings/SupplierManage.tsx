import { useState } from 'react';
import { Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { UploadFile, PersonAdd, GroupAdd } from '@mui/icons-material';
import { CustomSuplierManagementIcon, EmailSendIcon } from '../../assets/icons';
import LabelForm from '../../components/LabelForm';
import GroupTable from '../../components/Settings/SupplierManagement/GroupTable';
import SupplierTable from '../../components/Settings/SupplierManagement/SupplierTable';
import CustomToaster from '../../components/Toaster';
import SupplierForm from '../../components/Settings/SupplierManagement/form/SupplierForm';
import SupplierEmailSend from '../../components/Settings/SupplierManagement/SupplierEmailSend';
import { initialSuppliers } from '../../constants';

const SupplierManage = () => {
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState<any>([]);
  const [supplierData, setSupplierData] = useState<any | null>(initialSuppliers);
  const [emailData, setEmailData] = useState<any | null>(null);

  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [loadingSupplier, setLoadingSupplier] = useState(false);
  const [showEmailSupplier, setShowEmailSupplier] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleCheckboxChange = (index: number) => {
    const updatedSupplier = supplierData.map((row: any, i: any) =>
      i === index ? { ...row, checked: !row.checked } : row
    );
    setSupplierData(updatedSupplier);
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const selectedRows = supplierData.filter((row: any) => row.checked);
    if (selectedRows.length > 0 && groupName.trim() !== '') {
      setGroups([...groups, { name: groupName, suppliers: selectedRows }]);
      setGroupName('');
    }
  };

  const handleTextChange = (name: string, value: any) => {
    setSupplierData({ ...supplierData, [name]: value });
  };

  const handleEmailChange = (name: string, value: any) => {
    setEmailData({ ...emailData, [name]: value });
  };

  const handleCreateUser = () => {
    setShowSupplierForm(true);
  };

  const handleSendEmail = () => {
    setShowEmailSupplier(true);
  };

  const handleBackToTable = () => {
    setShowSupplierForm(false);
    setShowEmailSupplier(false);
    setSupplierData(initialSuppliers);
    setEmailData(null);
  };

  const handleSubmitSupplier = async (event: any) => {
    event?.preventDefault();
    if (supplierData) {
      setLoadingSupplier(true);
      try {
        if (supplierData?._id) {
          // await updateSupplier(auth, SupplierData);
          showToast('success', 'The Supplier was updated successfully');
        } else {
          // await addSupplier(auth, SupplierData);
          showToast('success', 'The Supplier was created successfully');
        }
      } catch (error) {
        console.log(error);
        showToast('error', 'An error has appear' + error);
      } finally {
        setLoadingSupplier(false);
        setShowSupplierForm(false);
      }
    }
  };

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CustomSuplierManagementIcon />
            <Typography className="text-3xl font-normal">Supplier Management</Typography>
          </div>
          <div className="flex flex-row gap-4">
            <Button variant="outlined" startIcon={<UploadFile />} className="normal-case" disabled>
              Upload List Supplier
            </Button>
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              className="normal-case px-6 py-3"
              onClick={handleCreateUser}
              disabled={showSupplierForm}
            >
              Create New Supplier
            </Button>
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          Manage your supplier information. Add new suppliers, update existing details, and ensure seamless integration
          for procurement processes.
        </Typography>
      </div>
      <Divider className="mt-12 mb-9" />
      {showSupplierForm ? (
        <SupplierForm
          supplierData={supplierData}
          handleSubmitSupplier={handleSubmitSupplier}
          handleBackToTable={handleBackToTable}
          handleTextChange={handleTextChange}
          loadingSupplier={loadingSupplier}
        />
      ) : showEmailSupplier ? (
        <SupplierEmailSend
          emailData={emailData}
          handleBackToTable={handleBackToTable}
          handleSubmit={handleSubmit}
          handleTextChange={handleEmailChange}
        />
      ) : (
        <>
          <div className="flex flex-row justify-between items-center mb-6">
            <Typography className="text-xl font-medium">List of Suppliers</Typography>
            <div className="flex flex-row justify-end gap-4">
              <Button
                variant="contained"
                startIcon={<EmailSendIcon />}
                className="normal-case px-6 py-3"
                onClick={handleSendEmail}
              >
                Email Supplier
              </Button>
              <Button variant="outlined" startIcon={<UploadFile />} className="normal-case px-6 py-3" disabled>
                Excel
              </Button>
            </div>
          </div>
          <SupplierTable rows={supplierData} handleCheckboxChange={handleCheckboxChange} />
          <form onSubmit={handleSubmit}>
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
          {groups && <GroupTable groups={groups} />}
        </>
      )}
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default SupplierManage;
