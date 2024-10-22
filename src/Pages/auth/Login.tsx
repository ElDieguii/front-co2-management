import { useState } from 'react';
import { TextField, FormControlLabel, Typography, Checkbox } from '@mui/material';
import img_login from '../../assets/Images/EnExpertBg.jpeg';
import img_logo from '../../assets/Images/logo.svg';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAuthContext } from '../../hooks/AuthContext';
import AxiosProvider from '../../hooks/ApiContext';

const Login = () => {
  const { signIn, user, token } = useAuthContext();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  if (user || token) {
    return <Navigate to="/" replace />;
  }

  const handleInputChange = (name: string, value: any) => {
    setLogin({ ...login, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosProvider().post('/api/login', login);
      const user = response?.data?.user;
      const token = response?.data?.token;
      if (user && token) {
        await signIn(token, user);
        if (user.role === 'admin') {
          navigate('/create-company');
        } else {
          navigate('/company');
        }
      }
    } catch (err) {
      setLoginError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-h-screen flex flex-col md:flex-row overflow-y-scroll">
      <div className="w-full md:w-1/2 relative h-1/2 md:h-full">
        <img src={img_login} alt="img login" className="w-full h-full object-cover " />

        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute top-10 md:top-14 left-8 md:left-24">
          <img src={img_logo} alt="img login" className="w-32 md:w-52 h-full " />
        </div>

        <div className=" mt-200 absolute bottom-8 md:bottom-32 left-8 md:left-24 w-4/5 md:w-3/5 ">
          <Typography className=" text-xl  md:text-3xl font-medium text-white leading-relaxed">
            Environmental responsibility
            <br />
            through Carbon Management
          </Typography>
          <Typography className="mt-4 text-sm md:text-base font-light text-white">
            Reduce your carbon footprint with real-time CO2 monitoring and reporting, and take steps <br /> towards a
            sustainable future
          </Typography>
        </div>
      </div>
      <div className="w-full md:w-2/4 flex-col flex items-center justify-center py-2 md:py-10 md:px-10">
        <div className="flex flex-col text-center mb-3">
          <img src={img_logo} alt="img logo" className="mb-6 w-32 md:w-30 h-full m-auto " />
          <Typography className="font-medium text-xl  md:text-2xl  mb-4 ">Carbon Management App</Typography>
          <Typography className="text-sm md:text-base text-gray-400">
            Welcome! Please enter your information.
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="w-full lg:max-w-xl">
          <div className="px-8">
            <div className="p-0">
              <div>
                <label className="mb-2 text-left">Email</label>
                <TextField
                  placeholder="Email"
                  type="email"
                  required
                  value={login?.email}
                  onChange={(e: any) => handleInputChange('email', e.target.value)}
                  className="w-full "
                />
              </div>
              <div className="mt-5">
                <label className="mb-2 text-left">Password</label>
                <TextField
                  type="password"
                  placeholder="Password"
                  required
                  value={login?.password}
                  onChange={(e: any) => handleInputChange('password', e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 mb-6">
              <FormControlLabel control={<Checkbox name="checkedA" />} label="Remember Me" />
              <Link to="#" className="text-[#37A1DB] no-underline hover:underline">
                I Forgot My Password
              </Link>
            </div>
            {loginError && <div className="text-red-500 text-left mb-2">The credentials are wrong.</div>}
            <LoadingButton variant="contained" className="mt-4 w-full py-4" type="submit" loading={loading}>
              Login
            </LoadingButton>
            <div className="mt-4 text-center">
              <Typography>
                Don't have an account?{' '}
                <Link to="/register" className="text-[#37A1DB] no-underline hover:underline">
                  Sign up
                </Link>
              </Typography>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
