import { FC } from 'react';
import {
  Typography,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  CircularProgress,
} from '@mui/material';
import { InformationIcon } from '../../../../assets/icons';

interface Props {
  activity: any;
  selectedResult: any;
  loading: boolean;
  setSelectedResult: (result: any) => void;
  refreshData: (pageNumber: number) => void;
  setShowCalculate: any;
}

const SearchTable: FC<Props> = ({
  activity,
  selectedResult,
  loading,
  setSelectedResult,
  refreshData,
  setShowCalculate,
}) => {
  const handleCheckboxChange = (result: any) => {
    if (selectedResult?.id === result.id) {
      setSelectedResult(null);
      setShowCalculate(false);
    } else {
      setSelectedResult(result);
      setShowCalculate(true);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    refreshData(newPage + 1);
  };

  return (
    <div className="w-full">
      <Typography variant="h6" gutterBottom className="pl-4">
        Co2e Factor
      </Typography>
      <div className="p-1">
        {loading ? (
          <div className="flex items-center justify-center min-h-[225px]">
            <CircularProgress />
          </div>
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{ '& th, & td': { border: 'none' } }}
              className="shadow-md rounded-lg max-h-72 overflow-y-scroll"
            >
              <Table sx={{ border: 0 }} aria-label="spanning table">
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center">Year</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Region</TableCell>
                    <TableCell align="center">Database</TableCell>
                    <TableCell align="center">CO2e/Unit</TableCell>
                    <TableCell align="center">Unit Type</TableCell>
                    <TableCell align="center">Total CO2e</TableCell>
                    <TableCell align="center">Other GHGs</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activity
                    ? activity.results?.map((result: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell padding="checkbox" align="center">
                            <Checkbox
                              checked={result.id === selectedResult?.id}
                              onChange={() => handleCheckboxChange(result)}
                            />
                          </TableCell>
                          <TableCell align="center">{result.year || '-'}</TableCell>
                          <TableCell align="center" width={120}>
                            {result.name || '-'}
                          </TableCell>
                          <TableCell align="center">{result.region || '-'}</TableCell>
                          <TableCell align="center">{result.source || '-'}</TableCell>
                          <TableCell align="center">{result.factor || '-'}</TableCell>
                          <TableCell align="center">{result.unit_type || '-'}</TableCell>
                          <TableCell align="center">{result.constituent_gases.co2e_total || '-'}</TableCell>
                          <TableCell align="center">{result.constituent_gases.co2e_other || '-'}</TableCell>
                          <TableCell align="center">
                            <IconButton>
                              <InformationIcon className="text-blue-500" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    : [1].map((_result: any, index: any) => (
                        <TableRow key={index}>
                          <TableCell padding="checkbox" align="center">
                            <Checkbox />
                          </TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">-</TableCell>
                          <TableCell align="center">
                            <IconButton>
                              <InformationIcon className="text-blue-500" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={activity?.total_results || 10}
              rowsPerPage={10}
              page={activity?.current_page - 1 || 0}
              onPageChange={handleChangePage}
              sx={{
                '& .MuiTablePagination-toolbar': {
                  justifyContent: 'flex-end',
                },
                '& .MuiTablePagination-selectLabel, & .MuiTablePagination-selectRoot, & .MuiTablePagination-select, & .MuiInputBase-input, & .MuiSelect-icon':
                  {
                    display: 'none',
                  },
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default SearchTable;
