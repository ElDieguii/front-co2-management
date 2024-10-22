import { FC } from 'react';
import { Pie } from '@ant-design/plots';
import { Colors } from '../../../constants';

interface EmissionByScopeGraphProps {
  totalScope1: number;
  totalScope2: number;
  totalScope3: number;
}

const EmissionByScopeGraph: FC<EmissionByScopeGraphProps> = ({ totalScope1, totalScope2, totalScope3 }) => {
  const data = [
    {
      type: 'Scope 1',
      value: totalScope1 || 0,
    },
    {
      type: 'Scope 2',
      value: totalScope2 || 0,
    },
    {
      type: 'Scope 3',
      value: totalScope3 || 0,
    },
  ];

  const config: any = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    legend: false,
    interactions: [
      {
        type: 'element-active',
      },
    ],
    color: ({ type }: any) => {
      if (type === 'Scope 1') return Colors[0];
      if (type === 'Scope 2') return Colors[1];
      if (type === 'Scope 3') return Colors[2];
      return '#ccc';
    },
  };

  return <Pie {...config} style={{ height: '200px' }} />;
};

export default EmissionByScopeGraph;
