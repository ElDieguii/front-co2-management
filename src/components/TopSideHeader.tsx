import { FC, ReactNode } from 'react';
import { Typography } from '@mui/material';

interface TopSideHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

const TopSideHeader: FC<TopSideHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="flex flex-row justify-between items-center mb-5">
      <div className={`flex flex-col items-baseline ${description ? 'gap-5' : ''}`}>
        <Typography className="text-3xl font-medium">{title}</Typography>
        {description && <Typography className="font-normal text-[#979DA6]">{description}</Typography>}
      </div>
      {children}
    </div>
  );
};

export default TopSideHeader;
