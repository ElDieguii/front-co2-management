import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

function CustomToaster({ message, severity, open, setOpen }: any) {
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <div className="fixed flex items-center w-full max-w-md p-4 space-x-4 rounded-lg top-5 right-5 " role="alert">
        <Alert onClose={handleClose} severity={severity} variant="standard" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </div>
    </Snackbar>
  );
}

export default CustomToaster;
