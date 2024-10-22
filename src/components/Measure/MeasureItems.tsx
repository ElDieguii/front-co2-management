import { FC } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import MeasureCards from './MeasureCard';
import AddIcon from '@mui/icons-material/Add';

const MeasureItems: FC<any> = ({ handleNew, items, handleDelete, handleSelect }) => {
  return (
    <>
      <Grid item xs={12}>
        <div className="flex flex-row justify-between">
          <div>
            <Typography className="text-3xl font-normal">Measures</Typography>
          </div>
          <Button
            variant="contained"
            startIcon={<AddIcon fontSize="small" />}
            className="normal-case px-5 py-2"
            onClick={handleNew}
          >
            Add New
          </Button>
        </div>
      </Grid>
      <Grid item xs={12}>
        {items?.map((measure: any, idx: any) => (
          <div key={idx} className="mb-2">
            <MeasureCards
              index={idx}
              measure={measure}
              handleDelete={() => handleDelete(idx)}
              handleSelect={() => handleSelect(idx)}
            />
          </div>
        ))}
      </Grid>
    </>
  );
};

export default MeasureItems;
