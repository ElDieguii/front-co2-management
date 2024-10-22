import { FC, useState } from 'react';
import { TextField, Grid, Button, Divider } from '@mui/material';
import { CustomAddCompanyIcon } from '../../../../assets/icons';
import CompanyForm from '../../../Company/form/CompanyForm';
import LabelForm from '../../../LabelForm';
import { useAuthContext } from '../../../../hooks/AuthContext';

const InitialCompanyForm: FC<any> = ({ company, handleInputChange, handleNext }) => {
  const [loading] = useState(false);
  const { user } = useAuthContext();
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setShowForm(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} className="flex flex-row justify-between items-end mt-2">
          <Grid item xs={6}>
            <LabelForm label="Company Name" required={true} hasInfo={true} />
            <TextField
              size="small"
              placeholder="Name"
              className="mt-1"
              fullWidth
              required
              value={company?.companyName || ''}
              onChange={(e: any) => handleInputChange('companyName', e.target.value)}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            startIcon={<CustomAddCompanyIcon />}
            className="bg-blue-500 px-6 py-3"
            disabled={showForm}
          >
            Add
          </Button>
        </Grid>
      </form>
      <Divider className="mt-10" />
      {showForm && (
        <CompanyForm
          companyData={company}
          user={user}
          handleInputChange={handleInputChange}
          handleCompanyData={handleNext}
          loading={loading}
        />
      )}
    </div>
  );
};

export default InitialCompanyForm;
