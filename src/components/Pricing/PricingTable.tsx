import { FC, Fragment } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';

const data = [
  {
    category: 'Data Acquisition',
    rows: [
      { name: 'Manuelle Eingabe', col1: true, col2: true, col3: true, col4: true },
      { name: 'Upload Excel file & existing Reports', col1: true, col2: true, col3: true, col4: true },
      { name: 'AI-Autopilot', col1: false, col2: true, col3: true, col4: true },
      { name: 'EMS & KM Integration', col1: false, col2: false, true: false, col4: true },
    ],
  },
  {
    category: 'Reporting',
    rows: [
      { name: 'GHG-konforme Reports', col1: true, col2: true, col3: true, col4: true },
      { name: 'Analyse', col1: false, col2: true, col3: true, col4: true },
      { name: 'Product Base', col1: false, col2: true, col3: true, col4: true },
      { name: 'Investment calculation (Capex/Opex)', col1: false, col2: false, col3: true, col4: true },
      { name: 'Prognose / Forecasting', col1: false, col2: false, col3: true, col4: true },
    ],
  },
  {
    category: 'Reduce',
    rows: [
      { name: 'Net Zero Strategy', col1: false, col2: true, col3: true, col4: true },
      { name: 'AI-Measures', col1: false, col2: true, col3: true, col4: true },
    ],
  },
  {
    category: 'Compensate',
    rows: [
      { name: 'JA', col1: true, col2: true, col3: true, col4: true },
      { name: '10% Discount', col1: false, col2: false, col3: true, col4: true },
      { name: '15% Discount', col1: false, col2: false, col3: false, col4: true },
    ],
  },
  {
    category: 'Support',
    rows: [
      { name: '24 - 72h Support', col1: true, col2: true, col3: true, col4: true },
      { name: '12 - 24h', col1: false, col2: true, col3: true, col4: true },
      { name: '< 12h', col1: false, col2: false, col3: false, col4: true },
    ],
  },
];

const CustomTable: FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {data.map((section, index) => (
            <Fragment key={index}>
              <TableRow>
                <TableCell colSpan={5} className="bg-gray-700 text-white">
                  {section.category}
                </TableCell>
              </TableRow>
              {section.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell className="border-r-gray-200 border-l-gray-200">{row.name}</TableCell>
                  <TableCell
                    width={225}
                    className={`text-center border-r-gray-200 border-y-gray-200 border-transparent 
                      ${row.col1 ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    {row.col1 ? '✓' : '✕'}
                  </TableCell>
                  <TableCell
                    width={225}
                    className={`text-center border-r-gray-200 border-y-gray-200 border-transparent 
                      ${row.col2 ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    {row.col2 ? '✓' : '✕'}
                  </TableCell>
                  <TableCell
                    width={225}
                    className={`text-center border-r-gray-200 border-y-gray-200 border-transparent 
                      ${row.col3 ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    {row.col3 ? '✓' : '✕'}
                  </TableCell>
                  <TableCell
                    width={225}
                    className={`text-center border-r-gray-200 border-y-gray-200 border-transparent 
                      ${row.col4 ? 'text-blue-500' : 'text-red-500'}`}
                  >
                    {row.col4 ? '✓' : '✕'}
                  </TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
