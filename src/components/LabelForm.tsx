import { FC } from 'react';
import { InformationIcon } from '../assets/icons';
import { Typography } from '@mui/material';

interface LabelFormProps {
  label: string;
  required?: boolean;
  hasInfo?: boolean;
}

const LabelForm: FC<LabelFormProps> = ({ label, required = false, hasInfo = false }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Typography className="font-medium text-sm ml-[2px]">
        {label} {required && <span className="text-[#0F5699]">*</span>}
      </Typography>
      {hasInfo && <InformationIcon className="w-4 text-[#0F5699]" />}
    </div>
  );
};

export default LabelForm;
