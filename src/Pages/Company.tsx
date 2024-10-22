import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCompanyData } from '../services/CompanyFunctions';
import TopSideHeader from '../components/TopSideHeader';
import CompanyForm from '../components/Company/form/CompanyForm';
import ButtonFooter from '../components/ButtonFooter';
import CustomToaster from '../components/Toaster';
import { initialCompanyData } from '../constants';
import { useAuthContext } from '../hooks/AuthContext';
import { CompanyData } from '../types/Primary';
import AxiosProvider from '../hooks/ApiContext';

const Company = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  const [companyData, setCompanyData] = useState<CompanyData | null>(initialCompanyData);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [loading, setLoading] = useState(false);

  const handleInputChange = (name: string, value: any) => {
    setCompanyData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClearAll = () => {
    setCompanyData(initialCompanyData);
  };

  const handleNext = () => {
    if (companyData) {
      navigate('/scope1');
    }
  };

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpen(true);
  };

  //update company data
  const updateCompanyData = async (data: CompanyData | null) => {
    setLoading(true);
    try {
      await AxiosProvider(token).put('/api/companies/update/' + user._id, data);
      showToast('success', 'Company updated successfully');
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const getCompanyData = async () => {
    try {
      await fetchCompanyData(token, user, setCompanyData);
    } catch (error: any) {
      console.log(error);
      showToast('error', 'An error has appear' + error);
    }
  };

  useEffect(() => {
    getCompanyData();
  }, []);

  return (
    <div className="max-w-6xl pl-6">
      <TopSideHeader
        title="Report Details"
        description="Please fill out the fields below to create your report. Ensure all information is accurate and up-to-date."
      />
      <CompanyForm
        companyData={companyData}
        user={user}
        handleInputChange={handleInputChange}
        handleCompanyData={updateCompanyData}
        loading={loading}
      />
      <ButtonFooter handleClearAll={handleClearAll} handleNext={handleNext} index={0} />
      {message && <CustomToaster message={message} severity={severity} open={open} setOpen={setOpen} />}
    </div>
  );
};

export default Company;
