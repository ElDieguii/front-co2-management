import { FC } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Avatar, Chip } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { PricingBuildingIcon } from '../../assets/icons';

interface PricingCardProps {
  title: string;
  companies: string;
  price: number;
  hours: string;
  icon: any;
  id: any;
  handlePricing: (id: any) => void;
}

const PricingCard: FC<PricingCardProps> = ({ title, companies, price, hours, icon, id, handlePricing }) => {
  return (
    <Card
      className={`max-w-56 min-w-56 p-2 rounded-lg shadow-md border border-gray-200 ${
        title !== 'Enterprise' ? 'bg-white' : 'bg-[#37A1DB]'
      }`}
    >
      <CardContent className="flex flex-col items-start">
        <Avatar className={`bg-[#FCFCFC] mb-4 p-2 shadow-[inset_0px_2px_4px_0px_rgb(189,189,189)] text-[#37A1DB] `}>
          {icon}
        </Avatar>
        <Typography variant="h6" className={`font-bold ${title !== 'Enterprise' ? 'text-black' : 'text-white'}`}>
          {title}
        </Typography>
        <div className="flex items-center mt-2 mb-4 gap-1 text-gray-700">
          <PricingBuildingIcon fontSize="small" />
          <Typography variant="body2">{companies} Company</Typography>
        </div>
        <div className="flex flex-col gap-2 min-h-20 justify-end">
          {title === 'Enterprise' && <Chip label="Starting at" className="bg-white" />}
          <Typography
            variant="h1"
            className={`${title !== 'Enterprise' ? 'text-[#37A1DB]' : 'text-white'} font-semibold text-4xl`}
          >
            {price}€
          </Typography>
        </div>
      </CardContent>
      <CardActions className="justify-center p-4">
        <Button
          variant="contained"
          fullWidth
          onClick={() => handlePricing(id)}
          className={`normal-case py-2 ${title === 'Enterprise' && 'bg-white'}`}
        >
          <Typography
            className={`flex items-center justify-center ${title !== 'Enterprise' ? 'text-white' : 'text-[#37A1DB]'}`}
          >
            ✨ Upgrade
          </Typography>
        </Button>
      </CardActions>
      <CardContent className="flex flex-row items-center gap-2 p-2 mb-3">
        <AccessTime fontSize="small" className={`${title !== 'Enterprise' ? 'text-gray-500' : 'text-white'}`} />
        <Typography variant="body2" className="text-gray-700 text-xs">
          Consulting Hours:
          <span className={`${title !== 'Enterprise' ? 'text-blue-500' : 'text-white'}`}> {hours}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
