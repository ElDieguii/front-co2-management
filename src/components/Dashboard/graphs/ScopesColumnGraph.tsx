import { FC } from 'react';
import { Column } from '@ant-design/plots';

const ScopesColumnGraph: FC<any> = ({ data, color }) => {
  const item =
    data
      ?.reduce((res: any, cur: any) => {
        let existing = res.find((item: any) => item.type === cur.type);
        if (existing) {
          existing.value += cur.total;
        } else {
          res.push({ type: cur.type, value: cur.total });
        }
        return res;
      }, [])
      .map((u: any) => ({ type: u.type, value: parseFloat(u.value.toFixed(2)) })) || [];

  const config: any = {
    data: item,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      area: {
        alias: 'Area',
      },
      value: {
        alias: 'Amount',
      },
    },
  };

  return (
    <>
      <Column {...config} color={color} style={{ height: '200px', width: '100%' }} />
    </>
  );
};

export default ScopesColumnGraph;
