import { FC, SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { CustomAddCompanyIcon } from '../../assets/icons';
import CreateCompany from '../../components/Company/create/CreateCompany';
import CustomToaster from '../../components/Toaster';
import { CompanyData } from '../../types/Primary';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const CreateCompanyNewUI: FC<any> = () => {
  const [value, setValue] = useState(0);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (name: any, value: any) => {
    setCompany((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleClearAll = () => {
    setCompany(null);
    setShowForm(false);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setShowForm(true);
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CustomAddCompanyIcon />
            <Typography className="text-3xl font-normal">Add Company data</Typography>
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          Please select a reporting type
        </Typography>
      </div>
      <Box className="mt-5 w-full">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Company" />
            <Tab label="Facility" disabled />
            <Tab label="Product" disabled />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <CreateCompany
            company={company}
            showForm={showForm}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            handleClearAll={handleClearAll}
            showToast={showToast}
          />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default CreateCompanyNewUI;
