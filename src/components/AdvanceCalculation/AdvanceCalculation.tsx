import { FC, SyntheticEvent, useState } from 'react';
import { Box, Button, Modal, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ClimatiQCalculation from './ClimatiqCalculation/ClimatiQCalculation';
import OwnCalculation from './OwnCalculation/OwnCalculation';
import { CustomArrowIcon, CustomCloseIcon } from '../../assets/icons';
import CustomToaster from '../Toaster';

interface props {
  scopeNumber: number;
  onSubmit: (scope: any) => void;
  fetchResults: any;
}

const AdvanceCalculation: FC<props> = ({ scopeNumber, fetchResults, onSubmit }) => {
  const [value, setValue] = useState('1');

  const [openToast, setOpenToast] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);

  const showToast = (severity: any, message: any) => {
    setSeverity(severity);
    setMessage(message);
    setOpenToast(true);
  };

  const handleCloseModal = () => {
    setValue('1');
    setOpenModal(false);
  };

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Button variant="contained" className="gap-2" onClick={handleOpen}>
        Advanced Calculation
        <CustomArrowIcon fontSize="small" />
      </Button>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1400,
            height: 800,
            bgcolor: 'white',
            p: 4,
          }}
        >
          <div className="flex flex-row justify-between items-center">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Advances Calculation
            </Typography>
            <CustomCloseIcon onClick={handleCloseModal} className="hover:text-blue-500 cursor-pointer" />
          </div>
          <Box className="w-full">
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Search for CO2e factor" value="1" className="normal-case" />
                  <Tab label="Use own CO2e factor" value="2" className="normal-case" />
                </TabList>
              </Box>
              <TabPanel value="1" className="overflow-y-auto max-h-[675px] mx-4">
                <ClimatiQCalculation
                  scopeNumber={scopeNumber}
                  fetchResults={fetchResults}
                  showToast={showToast}
                  onSubmit={onSubmit}
                />
              </TabPanel>
              <TabPanel value="2" className="overflow-y-auto max-h-[675px] mx-4">
                <OwnCalculation scopeNumber={scopeNumber} showToast={showToast} onSubmit={onSubmit} />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Modal>
      {message && <CustomToaster message={message} severity={severity} open={openToast} setOpen={setOpenToast} />}
    </>
  );
};

export default AdvanceCalculation;
