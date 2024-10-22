// src/components/ReportTable.tsx
import { FunctionComponent } from 'react';
import { Grid } from '@mui/material';
import { Scope1, Scope2, Scope3 } from '../../../types/Primary';

type Props = {
  scope1Items: Array<Scope1>;
  scope2Items: Array<Scope2>;
  scope3Items: Array<Scope3>;
};

const getTotal = (items: any[]) => {
  return items?.reduce((sum: any, item: any) => {
    return sum + item.total;
  }, 0);
};

const getByArea = (data: any[]) => {
  const items = data?.reduce((res, cur) => {
    const existing = res.find((item: any) => item.type === cur.type);
    if (existing) {
      existing.value += cur.total;
    } else {
      res.push({ type: cur.type, value: cur.total });
    }
    return res;
  }, [] as { type: string; value: number }[]);
  return items?.map((u: any) => ({ type: u.type, value: u.value.toFixed(3) }));
};

const getPercent = (part: number, sum: number) => (sum === 0 ? '0' : ((part * 100) / sum).toFixed(2));

const ReportTable: FunctionComponent<Props> = ({ scope1Items, scope2Items, scope3Items }) => {
  const sum = getTotal(scope1Items) + getTotal(scope2Items) + getTotal(scope3Items);
  const totalScope1 = getTotal(scope1Items);
  const totalScope2 = getTotal(scope2Items);
  const totalScope3 = getTotal(scope3Items);

  const renderTableRow = (label: string, value: number, totalValue: number) => (
    <tr className="bg-[#EEF6FB]">
      <td className="px-6 py-4 whitespace-nowrap border-l-gray-200 border-y-gray-200 border-transparent">
        <div className="text-base font-bold text-[#0099FF] text-left ">{label}</div>
      </td>
      <td className="px-6 py-4 font-bold whitespace-nowrap border-y-gray-200 border-transparent">
        <div className="text-base text-[#0099FF] text-left ">{(value / 1000).toFixed(2)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap border-r-gray-200 border-y-gray-200 border-transparent">
        <div className="px-2 text-base leading-5 font-bold text-[#0099FF] text-left ">
          {getPercent(value, totalValue)}%
        </div>
      </td>
    </tr>
  );

  const renderAreaRows = (items: any[], totalScope: number) => (
    <>
      {items?.map((item: any, idx: number) => (
        <tr key={idx}>
          <td className="px-12 py-4 whitespace-nowrap border-l-gray-200 border-y-gray-200 border-transparent">
            <div className="text-sm font-medium text-gray-800 text-left ">{item.type} *</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-y-gray-200 border-transparent">
            <div className="text-sm text-gray-900 text-left ">{(item.value / 1000).toFixed(2)}</div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap border-r-gray-200 border-y-gray-200 border-transparent">
            <div className="px-2 text-left text-sm leading-5 text-gray-800 ">{getPercent(item.value, totalScope)}%</div>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <Grid item xs={12}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-[#0099FF] ">
            <tr>
              <th scope="col" className="px-6 py-6 text-white border-transparent"></th>
              <th
                scope="col"
                className="px-6 py-6 text-left text-base font-medium text-white normal-case border-transparent"
              >
                Emissions total in t CO2e
              </th>
              <th
                scope="col"
                className="px-6 py-6 text-left text-base font-medium text-white normal-case border-transparent"
              >
                Percentage of total emissions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {renderTableRow('Scope 1', totalScope1, sum)}
            {renderAreaRows(getByArea(scope1Items), totalScope1)}
            {renderTableRow('Scope 2', totalScope2, sum)}
            {renderAreaRows(getByArea(scope2Items), totalScope2)}
            {renderTableRow('Scope 3', totalScope3, sum)}
            {renderAreaRows(getByArea(scope3Items), totalScope3)}
            <tr className="bg-white">
              <td className="px-6 py-4 whitespace-nowrap border-l-gray-200 border-y-gray-200 border-transparent">
                <div className="text-base font-bold text-black text-left ">Total</div>
              </td>
              <td className="px-6 py-4 font-bold whitespace-nowrap border-y-gray-200 border-transparent">
                <div className="text-base text-black text-left ">{(sum / 1000).toFixed(2)}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap border-r-gray-200 border-y-gray-200 border-transparent">
                <div className="px-2 text-base leading-5 font-bold text-black text-left ">{getPercent(sum, sum)}%</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Grid>
  );
};

export default ReportTable;
