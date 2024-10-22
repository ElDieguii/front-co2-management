import { FC, useState } from 'react';
import { Box } from '@mui/material';
import EmissionByScopeGraph from './graphs/EmissionByScopeGraph';
import ScopesColumnGraph from './graphs/ScopesColumnGraph';
import TopCategoryGraph from './graphs/TopCategoryGraph';
import InfoHeader from './InfoHeader';
import { Scope1, Scope2, Scope3, Scopes } from '../../types/Primary';
import { Colors } from '../../constants';
import { Row, Col } from 'antd';

interface DashboardGraphsProps {
  totalScopes: Scopes | null;
  company: any;
}

const DashboardGraphs: FC<DashboardGraphsProps> = ({ totalScopes, company }) => {
  const scope1Items = totalScopes?.filter((scopes: Scope1) => scopes?.scope === 1);
  const scope2Items = totalScopes?.filter((scopes: Scope2) => scopes?.scope === 2);
  const scope3Items = totalScopes?.filter((scopes: Scope3) => scopes?.scope === 3);

  const getTotal = (items: any[]) => {
    return items?.reduce((sum: any, item: any) => {
      return sum + item.total;
    }, 0);
  };

  const totalScope1 = getTotal(scope1Items || []);
  const totalScope2 = getTotal(scope2Items || []);
  const totalScope3 = getTotal(scope3Items || []);
  const sum = getTotal(scope1Items || []) + getTotal(scope2Items || []) + getTotal(scope3Items || []);

  const [dynamicUi] = useState([
    {
      switch: true,
      title: 'Total Emissions',
      position: 1,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Revenue Total',
      position: 2,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Energy',
      position: 3,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Emissions by Scope',
      position: 4,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Top 5 Categories',
      position: 5,
      width: {
        sm: 24,
        md: 24,
        lg: 16,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Scope 1',
      position: 6,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Scope 2',
      position: 7,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
    {
      switch: true,
      title: 'Scope 3',
      position: 8,
      width: {
        sm: 24,
        md: 24,
        lg: 8,
      },
      api: '/get-total-electric',
      dropdown: [],
    },
  ]);

  const TotalEmissions = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <InfoHeader title="Total Emissions" />
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box style={{ fontWeight: '500', fontSize: '18px' }}>{sum.toFixed(2)} t CO2</Box>
        </Box>
      </Box>
    );
  };

  const RevenueTotal = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <InfoHeader title="Revenue Total" />
        <Box style={{ fontWeight: '500', fontSize: '18px' }}>
          {((sum * 1000) / (company?.annualSales || 1)).toFixed(2)} kg CO2/€
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box style={{ fontWeight: '500', fontSize: '18px', color: '#2EC276' }}>{company?.annualSales || 0} €</Box>
        </Box>
      </Box>
    );
  };

  const Energy = () => {
    let energy = totalScopes
      ?.filter((scope: any) => scope.type === 'Electricity')
      .reduce((sum: any, item: any) => {
        return sum + item.total;
      }, 0);
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <InfoHeader title="Energy" />
        <Box style={{ fontWeight: '500', fontSize: '18px' }}>{(energy / 1000).toFixed(3)} t CO2/kg</Box>
      </Box>
    );
  };

  const EmissionsByScope = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <Box style={{ fontWeight: '600', fontSize: '18px' }}>Emissions by Scope</Box>
        <Box style={{ fontWeight: '500' }}>
          <Box style={{ marginTop: '-10px' }}>
            <EmissionByScopeGraph totalScope1={totalScope1} totalScope2={totalScope2} totalScope3={totalScope3} />
          </Box>
          <Box style={{ fontSize: '15px' }}>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>Scope 1</Box>
              <Box style={{ color: Colors[0] }}>{totalScope1?.toFixed(2)} t CO2</Box>
              <Box>{((totalScope1 * 100) / sum || 0).toFixed(2)}%</Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>Scope 2</Box>
              <Box style={{ color: Colors[1] }}>{totalScope2?.toFixed(2)} t CO2</Box>
              <Box>{((totalScope2 * 100) / sum || 0).toFixed(2)}%</Box>
            </Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>Scope 3</Box>
              <Box style={{ color: Colors[2] }}>{totalScope3?.toFixed(2)} t CO2</Box>
              <Box>{((totalScope3 * 100) / sum || 0).toFixed(2)}%</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  };

  const Scope1 = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <InfoHeader title="Scope 1" />
        <Box>
          <ScopesColumnGraph data={scope1Items} color={Colors[0]} />
        </Box>
      </Box>
    );
  };

  const Scope2 = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <InfoHeader title="Scope 2" />
        <Box>
          <ScopesColumnGraph data={scope2Items} color={Colors[1]} />
        </Box>
      </Box>
    );
  };

  const Scope3 = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <InfoHeader title="Scope 3" />
        <Box>
          <ScopesColumnGraph data={scope3Items} color={Colors[2]} />
        </Box>
      </Box>
    );
  };

  const TopCategories = () => {
    return (
      <Box className="flex flex-col justify-between p-5 h-full bg-white shadow-md rounded-md">
        <Box style={{ fontWeight: '600', fontSize: '18px' }}>Top 5 Categories</Box>
        <Box>
          <TopCategoryGraph scope1Items={scope1Items} scope2Items={scope2Items} scope3Items={scope3Items} />
        </Box>
      </Box>
    );
  };

  const componentMap = {
    'Total Emissions': TotalEmissions,
    'Revenue Total': RevenueTotal,
    Energy: Energy,
    'Emissions by Scope': EmissionsByScope,
    'Top 5 Categories': TopCategories,
    'Scope 1': Scope1,
    'Scope 2': Scope2,
    'Scope 3': Scope3,
  };

  return (
    <Box>
      <Row gutter={[20, 60]}>
        {dynamicUi &&
          dynamicUi
            ?.sort((a: any, b: any) => a.position - b.position)
            ?.map((obj: any, idx: any) => {
              const Component = componentMap[obj?.title as keyof typeof componentMap];
              return obj.switch && Component ? (
                <Col sm={obj?.width?.sm} md={obj?.width?.md} lg={obj?.width?.lg} style={{ width: '100%' }} key={idx}>
                  <Component />
                </Col>
              ) : null;
            })}
      </Row>
    </Box>
  );
};

export default DashboardGraphs;
