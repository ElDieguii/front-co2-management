import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { fetchUserbyId } from '../../services/UsersFunctions';
import { Box, Card, CardContent, CircularProgress, Typography, Button } from '@mui/material';
import { useAuthContext } from '../../hooks/AuthContext';

const InitialUserNewUI = () => {
  const navigate = useNavigate();
  const { signIn, user, token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [companyChecked, setCompanyChecked] = useState(false);

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'guest' || user.company) {
    return <Navigate to="/" replace />;
  }

  const handleCheckCompany = async () => {
    setLoading(true);
    setCompanyChecked(true);
    try {
      const response = await fetchUserbyId(token, user._id);
      const userData = response.data;
      if (userData && userData?.company) {
        signIn(token!, userData);
        navigate('/');
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setCompanyChecked(false);
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl pl-6">
      <Box className=" flex flex-col justify-center items-center max-h-screen">
        <Card variant="outlined" sx={{ marginTop: 3, padding: 2, maxWidth: 400, textAlign: 'center' }}>
          <CardContent>
            {loading ? (
              <>
                <CircularProgress />
                <Typography variant="h6" gutterBottom>
                  Please wait...
                </Typography>
                <Typography variant="body2" className="text-base">
                  Checking if a company has been assigned to your user. This may take a few moments.
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body2" gutterBottom className="text-base">
                  An administrator needs to assign a company to your user. Click the button below to check if the
                  process is completed.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleCheckCompany}
                  disabled={companyChecked}
                  className="normal-case text-lg px-5 py-3 mt-5"
                >
                  Verify
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default InitialUserNewUI;
