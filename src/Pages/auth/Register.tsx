import { useState } from 'react';
import { Box, TextField, FormControl, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import img_Register from '../../assets/Images/EnExpertBg.jpeg';
import img_logo from '../../assets/Images/logo.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import LabelForm from '../../components/LabelForm';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from '../../hooks/AuthContext';
import { UserData } from '../../types/Primary';
import AxiosProvider from '../../hooks/ApiContext';

const Register = () => {
  const navigate = useNavigate();
  const { user, token } = useAuthContext();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [RegisterError, setRegisterError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user && token) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (name: string, value: any) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    setRegisterError('');
    event.preventDefault();
    setLoading(true);
    try {
      await AxiosProvider().post('/api/register', userData);
      navigate('/login');
    } catch (err: any) {
      setRegisterError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box className="w-full max-h-screen flex flex-col md:flex-row md:overflow-hidden">
      <Box className="w-full md:w-1/2 relative h-1/2 md:h-full">
        <img src={img_Register} alt="img Register" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <Box className="absolute top-10 md:top-14 left-8 md:left-24">
          <img src={img_logo} alt="img Register" className="w-32 md:w-52 h-full" />
        </Box>
        <Box className="absolute bottom-8 md:bottom-32 left-8 md:left-24 w-4/5 md:w-3/5">
          <Typography className="text-2xl md:text-4xl font-medium text-white leading-relaxed">
            {'Environmental responsibility'}
            <br />
            {'through Carbon Management'}
          </Typography>
          <Typography className="mt-4 text-sm md:text-base font-light text-white">
            Reduce your carbon footprint with real-time CO2 monitoring and reporting, and take steps <br /> towards a
            sustainable future
          </Typography>
        </Box>
      </Box>
      <Box className="w-full md:w-1/2 flex items-center justify-center p-8 md:py-40 md:px-20">
        <Box className="w-full max-w-md">
          <Box className="flex flex-col text-center mb-8">
            <img src={img_logo} alt="img logo" className="mb-6 w-32 md:32 lg:w-44 h-full m-auto" />
            <Typography className="font-medium text-xl lg:text-3xl mb-4">Carbon Management App</Typography>
            <Typography className="text-sm lg:text-base text-gray-400">
              Welcome! Please enter your information.
            </Typography>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box className="px-0 lg:px-10 flex flex-col gap-4">
              <FormControl fullWidth>
                <LabelForm label="First Name" required={true} hasInfo={true} />
                <TextField
                  placeholder="Name"
                  required
                  value={userData?.firstName}
                  onChange={(e: any) => handleInputChange('firstName', e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <LabelForm label="Last Name" hasInfo={true} />
                <TextField
                  placeholder="Surname"
                  value={userData?.lastName}
                  onChange={(e: any) => handleInputChange('lastName', e.target.value)}
                />
              </FormControl>

              <FormControl fullWidth>
                <LabelForm label="Email" required={true} hasInfo={true} />
                <TextField
                  placeholder="Email"
                  type="email"
                  required
                  value={userData?.email}
                  onChange={(e: any) => handleInputChange('email', e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <LabelForm label="Password" required={true} hasInfo={true} />
                <TextField
                  type="password"
                  placeholder="Password"
                  required
                  value={userData?.password}
                  onChange={(e: any) => handleInputChange('password', e.target.value)}
                />
              </FormControl>
              <FormControl fullWidth>
                <LabelForm label="Phone Number" hasInfo={true} />
                <TextField
                  type="number"
                  placeholder="Number"
                  value={userData?.phoneNumber}
                  onChange={(e: any) => handleInputChange('phoneNumber', e.target.value)}
                />
              </FormControl>
              <FormControl>
                <LabelForm label="Role" required={true} hasInfo={true} />
                <RadioGroup
                  row
                  name="controlled-radio-buttons-group"
                  value={userData?.role}
                  onChange={(e: any) => handleInputChange('role', e.target.value)}
                >
                  <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                  <FormControlLabel value="guest" control={<Radio />} label="Guest" />
                </RadioGroup>
              </FormControl>
              {RegisterError && <div className="text-red-500 text-left mb-2">{RegisterError}</div>}
              <LoadingButton variant="contained" className="mt-4 w-full py-4" type="submit" loading={loading}>
                Register
              </LoadingButton>
              <div className="mt-2 text-center">
                <Typography>
                  Do you have an account?{' '}
                  <Link to="/login" className="text-[#37A1DB] no-underline hover:underline">
                    Sign in
                  </Link>
                </Typography>
              </div>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
