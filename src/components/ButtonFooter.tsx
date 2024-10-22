import { FC } from 'react';
import { Button, MobileStepper } from '@mui/material';

interface ButtonFooterProps {
  handleClearAll: () => void;
  handleNext: () => void;
  handleBack?: () => void;
  index: number;
}

const ButtonFooter: FC<ButtonFooterProps> = ({ handleClearAll, handleNext, handleBack, index }) => {
  return (
    <div className="flex flex-col gap-3 mt-8">
      <Button variant="outlined" fullWidth onClick={handleClearAll}>
        Clear all
      </Button>
      <div className="flex flex-row gap-5">
        {handleBack && (
          <Button variant="contained" onClick={handleBack} fullWidth>
            Back
          </Button>
        )}
        <Button variant="contained" onClick={handleNext} fullWidth>
          Next
        </Button>
      </div>
      <div className="flex justify-center mt-2">
        <MobileStepper variant="dots" steps={4} position="static" activeStep={index} backButton="" nextButton="" />
      </div>
    </div>
  );
};

export default ButtonFooter;
