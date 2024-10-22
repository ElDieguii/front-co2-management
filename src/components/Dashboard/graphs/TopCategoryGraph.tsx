/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, FC } from 'react';
import { Colors } from '../../../constants';
import { Scope1, Scope2, Scope3, Scope } from '../../../types/Primary';
import { Bar } from '@ant-design/plots';

interface DataItem {
  label: string;
  value: number;
  showLabel: string;
}

interface TopCategoryGraphProps {
  scope1Items: Scope1[] | undefined;
  scope2Items: Scope2[] | undefined;
  scope3Items: Scope3[] | undefined;
}

const transformItems = (items: Scope[]): DataItem[] => {
  if (!items || items.length === 0) return [];

  const groupedItems = items.reduce((acc, item) => {
    const key = item.scope + '-' + item.type;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {} as Record<string, Scope[]>);

  const transformedItems = Object.values(groupedItems).map((group) => {
    if (!group || group.length === 0) return { label: '', value: 0, showLabel: '' };

    const totalValue = group.reduce((total, item) => total + item.total, 0);
    const { scope, type } = group[0];
    return {
      label: type + '-' + scope,
      value: totalValue,
      showLabel: scope + ': ' + type,
    };
  });

  return transformedItems.filter((item) => item.label !== '');
};

const TopCategoryGraph: FC<TopCategoryGraphProps> = ({ scope1Items, scope2Items, scope3Items }) => {
  const itemscope1 = transformItems(scope1Items || []);
  const itemscope2 = transformItems(scope2Items || []);
  const itemscope3 = transformItems(scope3Items || []);

  const allItems = (): DataItem[] => {
    return [
      ...itemscope1.map((item) => ({
        label: item.label,
        value: item.value,
        showLabel: 'S1: ' + item.showLabel.split(': ')[1],
      })),
      ...itemscope2.map((item) => ({
        label: item.label,
        value: item.value,
        showLabel: 'S2: ' + item.showLabel.split(': ')[1],
      })),
      ...itemscope3.map((item) => ({
        label: item.label,
        value: item.value,
        showLabel: 'S3: ' + item.showLabel.split(': ')[1],
      })),
    ];
  };

  const [config, setConfig] = useState({
    data: [] as DataItem[],
    xField: 'value',
    yField: 'label',
    seriesField: 'label',
    legend: {
      position: 'top-right' as const,
    },
    color: (dt: any) => {
      const label = allItems().find((it) => it.label === dt.label)?.showLabel;
      if (label?.includes('1')) return Colors[0];
      if (label?.includes('2')) return Colors[1];
      if (label?.includes('3')) return Colors[2];
      return 'red';
    },
    meta: {
      label: {
        formatter: (lb: string) => allItems().find((it) => it.label === lb)?.showLabel || lb,
      },
    },
  });

  useEffect(() => {
    const data = allItems()
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    setConfig((prevConfig) => ({ ...prevConfig, data }));
  }, [scope1Items, scope2Items, scope3Items]);

  return <Bar {...config} style={{ height: '250px' }} />;
};

export default TopCategoryGraph;
