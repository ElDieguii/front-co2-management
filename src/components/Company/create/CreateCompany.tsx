import { FC, useState } from 'react';
import { Grid, Button, TextField, Divider } from '@mui/material';
import { CustomAddCompanyIcon } from '../../../assets/icons';
import LabelForm from '../../LabelForm';
import CompanyForm from '../form/CompanyForm';
import { useAuthContext } from '../../../hooks/AuthContext';
import { CompanyData } from '../../../types/Primary';
import AxiosProvider from '../../../hooks/ApiContext';

interface CompanyProps {
  company: CompanyData | null;
  showForm: boolean;
  handleInputChange: (name: string, value: any) => void;
  handleSubmit: (event: any) => void;
  handleClearAll: () => void;
  showToast: (severity: string, message: string) => void;
}

const CreateCompany: FC<CompanyProps> = ({
  company,
  showForm,
  handleSubmit,
  handleInputChange,
  handleClearAll,
  showToast,
}) => {
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuthContext();

  const CreateCompanyData = async (company: CompanyData | null) => {
    setLoading(true);
    if (company?.companyName) {
      try {
        const res = await AxiosProvider(token).post('/api/companies/add', company);
        console.log(res);
        showToast('success', 'Company Created successfully');
      } catch (error: any) {
        console.log(error.response?.data?.message);
        showToast('error', 'An error has appear: ' + error.response?.data?.message);
      } finally {
        setLoading(false);
        handleClearAll();
      }
    }
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
          handleCompanyData={CreateCompanyData}
          loading={loading}
        />
      )}
    </div>
  );
};

export default CreateCompany;
