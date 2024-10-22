import { FC, useState } from 'react';
import OwnCalculationForm from './form/OwnCalculationForm';
import { unitTypes } from '../../../constants';
import { useAuthContext } from '../../../hooks/AuthContext';
import { getCurrentYear } from '../../../utils/limitDecimal';
import FinalResults from '../../FinalResults';

interface Props {
  scopeNumber: number;
  showToast: (severity: any, message: any) => void;
  onSubmit: (scope: any) => void;
}

const OwnCalculation: FC<Props> = ({ scopeNumber, showToast, onSubmit }) => {
  const { user } = useAuthContext();
  const [ownFactor, setOwnFactor] = useState<any | null>(null);
  const [finalEmission, setFinalEmission] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChangeFactor = (name: any, value: any) => {
    setOwnFactor((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(finalEmission);
    setOwnFactor(null);
    setFinalEmission(null);
  };

  const handleCalculateOwnFactor = async (_event: any) => {
    _event.preventDefault();
    setLoading(true);
    if (!ownFactor) {
      showToast('warning', 'Please enter an emittent or any parameter to complete the calculation');
      setLoading(false);
      return;
    }
    try {
      if (ownFactor.co2e && ownFactor.amount && ownFactor.unit_type) {
        const factor = parseFloat(ownFactor.co2e);
        const amount = parseInt(ownFactor.amount);
        const newScope: any = {
          company: user?.company || '',
          scope: scopeNumber,
          type: `Advance Own Calculation (${ownFactor.category})`,
          amount: amount,
          unit_type: ownFactor.unit_type || '',
          region: ownFactor?.region_name || '',
          year: ownFactor.year || getCurrentYear(),
          co2e: factor,
          co2e_unit: unitTypes.Kilo,
          total: factor * amount,
        };

        setFinalEmission(newScope);
      } else {
        showToast('warning', 'Co2e, amount and unit type must be provided.');
      }
    } catch (error) {
      console.error('Error while setting final emission:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <OwnCalculationForm
        factor={ownFactor}
        handleInputChange={handleInputChangeFactor}
        handleAddEmission={handleCalculateOwnFactor}
      />
      <FinalResults
        finalScope={finalEmission}
        handleSubmit={handleSubmit}
        loading={loading}
        stationary={'Calculation Tool'}
        type={'Own Co2e Factor'}
      />
    </>
  );
};

export default OwnCalculation;
