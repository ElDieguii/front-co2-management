import { useEffect } from 'react';
import CargoForm from './CargoForm';
import RoutesTable from '../RoutesTable';
import { unitTypes } from '../../../constants';
import { Scope1 } from '../../../types/Primary';
import { getCurrentYear } from '../../../utils/limitDecimal';

const CargoComponent = ({
  baseScope1,
  setFinalScope1,
  routes,
  setRoutes,
  companyData,
  handleInputChange,
  showDetails,
  handleDetails,
  showToast,
  selectedRoute,
  setSelectedRoute,
}: any) => {
  useEffect(() => {
    if (selectedRoute) {
      const newScope: Scope1 = {
        company: companyData?._id || '',
        scope: 1,
        type: selectedRoute.type || '',
        amount: selectedRoute.amount || 0,
        unit_type: selectedRoute.unit_type || '',
        region: companyData?.region || '',
        year: getCurrentYear(),
        co2e: selectedRoute.totalCo2 / selectedRoute.amount,
        co2e_unit: unitTypes.Kilo,
        total: selectedRoute.totalCo2,
        freight: {
          distance: selectedRoute.km,
          start_location: selectedRoute.start,
          transport_type: selectedRoute.transport_type,
          end_location: selectedRoute.final,
          air: selectedRoute.air || undefined,
          sea: selectedRoute.sea || undefined,
          road: selectedRoute.road || undefined,
          rail: selectedRoute.rail || undefined,
        },
      };
      setFinalScope1(newScope);
    }
  }, [selectedRoute]);

  return (
    <>
      <CargoForm
        scope={baseScope1}
        setRoutes={setRoutes}
        handleInputChange={handleInputChange}
        showDetails={showDetails}
        handleDetails={handleDetails}
        showToast={showToast}
        setSelectedRoute={setSelectedRoute}
      />
      <RoutesTable routes={routes} setRoutes={setRoutes} setSelectedRoute={setSelectedRoute} />
    </>
  );
};

export default CargoComponent;
