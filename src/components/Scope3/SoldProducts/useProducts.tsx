import { FC, useState } from 'react';
import { fetchAutopilotEstimate } from '../../../services/ClimatiqFunctions';
import { useAuthContext } from '../../../hooks/AuthContext';
import EstimateForm from '../../Autopilot';
import { types } from '../../../constants';

interface Props {
  scope: any;
  company: any;
  setFinalScope: (scope: any) => void;
  handleInputChange: (key: string, value: any) => void;
  showToast: (severity: any, message: any) => void;
}

const UseSoldProducts: FC<Props> = ({ scope, company, setFinalScope, handleInputChange, showToast }) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const isValid = () => {
    if (!scope?.emittent || !scope?.amount || !scope.region) {
      showToast('warning', 'Please fill all the fields');
      return false;
    }
    return true;
  };

  const handleCalculate = async () => {
    if (isValid()) {
      setLoading(true);
      try {
        const res = await fetchAutopilotEstimate(token, scope);
        if (company) {
          const newScope3: any = {
            company: company?._id || '',
            scope: 3,
            type: types.UseSoldProducts,
            amount: scope?.amount || 0,
            unit_type: scope?.unit_type || '',
            region: company?.region || '',
            year: scope?.year || '',
            co2e: res?.estimate?.co2e / (scope?.amount || 1),
            co2e_unit: res?.estimate?.co2e_unit,
            total: res?.estimate?.co2e,
            source: res?.source_trail[0]?.source,
            source_dataset: res?.source_trail[0]?.source_dataset,
          };
          setFinalScope(newScope3);
        }
      } catch (error: any) {
        console.log(error);
        showToast('error', 'An error has appear: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <EstimateForm
      scope={scope}
      handleInputChange={handleInputChange}
      handleCalculate={handleCalculate}
      loading={loading}
      label="Use Products"
    />
  );
};

export default UseSoldProducts;
