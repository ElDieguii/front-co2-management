import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { updateUser } from '../../services/UsersFunctions';
import { Box, Button, Card, CardContent, CircularProgress, MobileStepper, Typography } from '@mui/material';
import { CustomSettingsIcon } from '../../assets/icons';
import AddIcon from '@mui/icons-material/Add';
import InitialAdmin from '../../components/Initial/Admin/InitialAdmin';
import Pricing from '../../components/Pricing/Pricing';
import { useAuthContext } from '../../hooks/AuthContext';
import { CompanyData } from '../../types/Primary';
import AxiosProvider from '../../hooks/ApiContext';

const InitialAdminNewUI = () => {
  const { signIn, user, token } = useAuthContext();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const [loading, setLoading] = useState(false);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin' || user.company) {
    return <Navigate to="/" replace />;
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleNextCompany = () => {
    handleNext();
  };

  const handleInputChange = (name: string, value: any) => {
    setCompanyData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePricing = async () => {
    setLoading(true);
    if (companyData?.companyName) {
      try {
        handleNext();
        const res = await AxiosProvider(token).post('/api/companies/add', companyData);
        const companyAssign = res.data;
        const updatedUser = { ...user, company: { _id: companyAssign._id } };
        await updateUser(token, updatedUser);
        await signIn(token, updatedUser);
      } catch (error: any) {
        console.log(error.response?.data?.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
          navigate('/');
        }, 1000);
      }
    }
  };
  function AdminSwitch() {
    switch (activeStep) {
      case 0:
        return (
          <div>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex flex-row gap-3 items-center">
                <CustomSettingsIcon />
                <Typography className="text-3xl font-normal">Set Up Your Company to Begin</Typography>
              </div>
              <Typography className="text-gray-400 max-w-3xl">
                Follow the steps below to create your company. This process will help you enter the necessary details
                and set up your company successfully.
              </Typography>
            </div>
            <Button variant="contained" onClick={handleNext} startIcon={<AddIcon />} className="normal-case p-3 mt-6">
              Create Company
            </Button>
          </div>
        );
      case 1:
        return (
          <InitialAdmin company={companyData} handleNext={handleNextCompany} handleInputChange={handleInputChange} />
        );
      case 2:
        return <Pricing callback={handlePricing} />;
      case 3:
        return (
          loading && (
            <Box className=" flex flex-col justify-center items-center max-h-screen">
              <Card variant="outlined" sx={{ marginTop: 3, padding: 2, maxWidth: 400, textAlign: 'center' }}>
                <CardContent>
                  <CircularProgress />
                  <Typography variant="h6" gutterBottom>
                    Please wait...
                  </Typography>
                  <Typography variant="body2">
                    The company is being created and assigned to your user. This may take a few moments.
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )
        );
    }
  }

  return (
    <div className="max-w-7xl pl-6">
      {AdminSwitch()}
      <MobileStepper
        variant="progress"
        steps={4}
        position="bottom"
        activeStep={activeStep}
        backButton=""
        nextButton=""
        className="left-1/4 mt-6 w-full"
      />
    </div>
  );
};

export default InitialAdminNewUI;
