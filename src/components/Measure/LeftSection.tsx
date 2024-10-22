/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { TextField, InputAdornment, Grid, Typography } from '@mui/material';
import LabelForm from '../LabelForm';
import { Scopes, Scope1, Scope2, Scope3 } from '../../types/Primary';
// import { format } from 'date-fns';
// import { updateReductionData, fetchReductionData } from '../../../../../services/Measures';

interface sectionProps {
  scopes: Scopes | null;
  measures: any;
}
const LeftSection: FC<sectionProps> = ({ scopes }) => {
  const scope1Items = scopes?.filter((scopes: Scope1) => scopes?.scope === 1);
  const scope2Items = scopes?.filter((scopes: Scope2) => scopes?.scope === 2);
  const scope3Items = scopes?.filter((scopes: Scope3) => scopes?.scope === 3);

  const [data, setData] = useState({
    reduction: null,
    until: new Date('2030-01-01T17:48:53.000Z'),
  });

  const getTotal = (items: any[]) => {
    return (
      items?.reduce((sum: any, item: any) => {
        return sum + item.total;
      }, 0) / 1000
    );
  };

  const total = getTotal(scope1Items || []) + getTotal(scope2Items || []) + getTotal(scope3Items || []);

  const handleInputChange = (name: string, value: any) => {
    let newDt = { ...data, [name]: value };
    setData(newDt);
    // updateReductionData(auth, newDt);
  };

  useEffect(() => {
    // fetchReductionData(auth, setData, formatDate);
  }, []);

  // const formatDate = (str: any) => {
  //   if (!str) return '';
  //   const parsedDate: any = new Date(str);
  //   if (isNaN(parsedDate)) {
  //     return '';
  //   }
  //   return format(parsedDate, 'yyyy-MM-dd');
  // };

  return (
    <Grid md={6} spacing={2} className="px-6">
      <Grid item xs={12} className="mb-7">
        <Typography className="text-xl font-normal">CO2 Reduction</Typography>
      </Grid>
      <Grid container item spacing={3} xs={12}>
        <Grid item xs={12}>
          <LabelForm label="Initial Emissions" hasInfo={true} />
          <TextField
            size="small"
            placeholder="emission"
            className="mt-1"
            fullWidth
            required
            type="number"
            value={total.toFixed(2)}
            InputProps={{
              endAdornment: <InputAdornment position="start">t CO2</InputAdornment>,
            }}
            disabled
          />
        </Grid>
        <Grid item container spacing={2} xs={12}>
          <Grid item xs={6}>
            <LabelForm label="Reduction Goal" hasInfo={true} />
            <TextField
              size="small"
              placeholder="reduction"
              className="mt-1"
              fullWidth
              required
              type="number"
              value={data?.reduction}
              onChange={(e: any) => handleInputChange('reduction', e.target.value)}
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <LabelForm label="Date" hasInfo={true} />
            <TextField
              size="small"
              placeholder="date"
              className="mt-1"
              fullWidth
              required
              type="date"
              value={data?.until}
              onChange={(e: any) => handleInputChange('until', e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <LabelForm label="Final" hasInfo={true} />
          <TextField
            size="small"
            placeholder="final C02"
            className="mt-1"
            fullWidth
            required
            type="number"
            value={data ? (total - (total * (data?.reduction || 0)) / 100).toFixed(2) : 0}
            InputProps={{
              endAdornment: <InputAdornment position="start">t CO2</InputAdornment>,
            }}
            disabled
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeftSection;
