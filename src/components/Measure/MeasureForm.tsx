import { FC } from 'react';
import {
  FormControl,
  MenuItem,
  TextField,
  InputAdornment,
  Grid,
  Button,
  Select,
  Slider,
  SliderValueLabelProps,
  Tooltip,
  Divider,
  Typography,
} from '@mui/material';
import LabelForm from '../LabelForm';

const MeasureForm: FC<any> = ({ item, data, editIndex, handleInputChange, handleClearAll, handleClickCancel }) => {
  function ValueLabelComponent(props: SliderValueLabelProps) {
    const { children, value } = props;

    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value + ' %'}>
        {children}
      </Tooltip>
    );
  }

  return (
    <>
      <Grid item xs={12}>
        <Typography className="font-normal text-2xl mb-2">{editIndex < 0 ? 'New' : 'Edit'} measure</Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <LabelForm label="Measures" required={true} hasInfo={true} />
        <FormControl fullWidth className="flex flex-row items-center">
          <Select
            size="small"
            className="w-full mt-2"
            sx={{ height: '40px', fontSize: '12px' }}
            value={item?.type}
            onChange={(e: any) => handleInputChange('type', e.target.value)}
            required
          >
            {/* {measures
              .filter((item) => item)
              .map((item: any, index: any) => (
                <MenuItem key={index} value={item.name}>
                  {item.name}
                </MenuItem>
              ))} */}
          </Select>
        </FormControl>
      </Grid>
      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12}>
          <Typography className="font-bold text-lg mb-2">Old issuer</Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <LabelForm label="Issuer" />
          <Select
            size="small"
            placeholder="issuer"
            className="mt-1"
            fullWidth
            value={item?.oldEmit}
            onChange={(e: any) => handleInputChange('oldEmit', e.target.value)}
            required
          >
            {data.oldEmitList.map((item: any, index: any) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <LabelForm label="Unit" />
          {/* <TextField
            size="small"
            placeholder="unit"
            className="mt-1"
            fullWidth
            type="number"
            required
            value={Utils.getOldCrowd(scope1Items, scope2Items, scope3Items, data.measure, item.oldEmit)}
          /> */}
        </Grid>
        <Grid item xs={12}>
          <LabelForm label="CO2 emissions" />
          {/* <TextField
            size="small"
            placeholder="unit"
            className="mt-1"
            fullWidth
            value={Utils.getOldAmount(scope1Items, scope2Items, scope3Items, data.measure, item.oldEmit).toFixed(2)}
            InputProps={{
              endAdornment: <InputAdornment position="end">t</InputAdornment>,
            }}
          /> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography className="font-bold text-lg mb-2">New issuer</Typography>
        <Divider className="mb-5" />
        <Grid item xs={12}>
          <LabelForm label="Issuer" />
          {/* <TextField
            size="small"
            placeholder="unit"
            className="mt-1"
            fullWidth
            value={Utils.getNewEmit(data.measure, item.oldEmit)}
          /> */}
        </Grid>
        <Grid item xs={12} className="mt-4">
          <LabelForm label="CO2 emissions" />
          {/* <TextField
            size="small"
            placeholder="unit"
            className="mt-1"
            fullWidth
            value={Utils.getNewAmount(scope1Items, scope2Items, scope3Items, data.measure, item.oldEmit).toFixed(2)}
            InputProps={{
              endAdornment: <InputAdornment position="end">t</InputAdornment>,
            }}
          /> */}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LabelForm label="Conversion" />
        <Slider
          className="w-full"
          valueLabelDisplay="auto"
          slots={{
            valueLabel: ValueLabelComponent,
          }}
          value={item?.conversion}
          onChange={(_e, num: number | number[]) => handleInputChange('conversion', num)}
        />
      </Grid>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={6}>
          <LabelForm label="Period Start" />
          <TextField
            size="small"
            placeholder="unit"
            className="mt-1"
            fullWidth
            type="date"
            required
            value={item.period_start}
            onChange={(e) => handleInputChange('period_start', e.target.value)}
          />
        </Grid>
        <Grid item xs={6}>
          <LabelForm label="Period End" />
          <TextField
            size="small"
            placeholder="unit"
            className="mt-1"
            fullWidth
            type="date"
            required
            value={item.period_end}
            onChange={(e) => handleInputChange('period_end', e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <LabelForm label="Status" />
        <TextField
          size="small"
          placeholder="unit"
          className="mt-1"
          fullWidth
          type="number"
          required
          value={item?.status}
          onChange={(e) => handleInputChange('status', e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end">%</InputAdornment>,
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <div className="mt-2">
          <Button variant="outlined" fullWidth onClick={handleClearAll}>
            Clear all
          </Button>
        </div>
        <div className="mt-4 flex item-center">
          <Button variant="contained" type="submit" className="grow me-4">
            {editIndex < 0 ? 'Add' : 'Save'}
          </Button>
          <Button variant="outlined" className="grow" onClick={handleClickCancel}>
            Cancel
          </Button>
        </div>
      </Grid>
    </>
  );
};

export default MeasureForm;
