import { useState, useEffect } from 'react';
import { fetchTotalScopes } from '../services/ScopesFunctions';
import { fetchCompanyData } from '../services/CompanyFunctions';
import { CircularProgress, Divider, Typography } from '@mui/material';
import CustomToaster from '../components/Toaster';
import { CustomDashboardIcon } from '../assets/icons';
import DashboardGraphs from '../components/Dashboard/DashboardGraphs';
import { useAuthContext } from '../hooks/AuthContext';
import { Scopes, CompanyData } from '../types/Primary';

const DashBoard = () => {
  const { user, token } = useAuthContext();
  const [totalScopes, setTotalScopes] = useState<Scopes | null>(null);
  const [company, setCompany] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  const getTotalScopeData = async () => {
    try {
      const res = await fetchTotalScopes(token, 0);
      setTotalScopes(res.data);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error.response?.data?.message);
    }
  };

  const getCompanyData = async () => {
    try {
      await fetchCompanyData(token, user, setCompany);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error.response?.data?.message);
    }
  };

  const PreLoad = () => {
    getTotalScopeData();
    getCompanyData();
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    !company && !totalScopes && PreLoad();
  }, []);

  return (
    <div className="max-w-6xl pl-6">
      <div className="flex flex-col gap-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <CustomDashboardIcon />
            <Typography className="text-3xl font-normal">Dashboard</Typography>
          </div>
        </div>
        <Typography variant="body1" className="text-gray-400">
          The Dashboard section gives the possibility to analyse the CO2 emissions and displays the data in graphs.
        </Typography>
      </div>
      <Divider className="mt-8 mb-9" />
      {loading ? (
        <div className="w-full flex justify-center items-center h-full">
          <CircularProgress />
        </div>
      ) : (
        <DashboardGraphs totalScopes={totalScopes} company={company} />
      )}
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default DashBoard;
