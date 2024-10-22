import { FC } from 'react';
import { TextareaAutosize, Typography, Grid, Button, Select, MenuItem } from '@mui/material';
import LabelForm from '../../LabelForm';
import { EmailSendIcon } from '../../../assets/icons';
import { initialSuppliers } from '../../../constants';

interface Props {
  emailData: any;
  handleSubmit: any;
  handleTextChange: any;
  handleBackToTable: any;
}

const SupplierEmailSend: FC<Props> = ({ emailData, handleSubmit, handleTextChange, handleBackToTable }) => {
  return (
    <>
      <div className="flex flex-row items-center gap-2">
        <EmailSendIcon />
        <Typography className="text-xl font-normal">Email Supplier</Typography>
      </div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} className="flex flex-col mt-4">
          <Grid item xs={6}>
            <LabelForm label="Choose Supplier" required={true} hasInfo={true} />
            <Select
              size="small"
              className="mt-1"
              value={emailData?.email || ''}
              onChange={(e: any) => handleTextChange('email', e.target.value)}
              fullWidth
              required
            >
              {initialSuppliers.map((item: any, index: any) => (
                <MenuItem key={index} value={item.email}>
                  {item.email}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <LabelForm label="Description" hasInfo={true} />
            <TextareaAutosize
              style={{
                maxWidth: '98%',
                minWidth: '98%',
                minHeight: '20px',
                borderRadius: 10,
                padding: 10,
              }}
              className="mt-1 border-gray-300 hover:border-black"
              minRows={5}
              value={emailData?.description || ''}
              onChange={(e: any) => handleTextChange('description', e.target.value)}
            />
          </Grid>
          <div className="flex flex-row justify-end gap-3 mt-12">
            <Button variant="outlined" className="px-6 py-3" onClick={handleBackToTable}>
              cancel
            </Button>
            <Button type="submit" variant="contained" className="px-6 py-3" disabled>
              Send Email
            </Button>
          </div>
        </Grid>
      </form>
    </>
  );
};

export default SupplierEmailSend;
