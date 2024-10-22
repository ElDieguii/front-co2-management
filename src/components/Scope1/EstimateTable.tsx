import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  IconButton,
  TablePagination,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Result } from '../../types/ClimatiQ';

const EstimateTable = ({ activity, selectedResult, setSelectedResult, refreshData }: any) => {
  const handleCheckboxChange = (result: any) => {
    if (selectedResult?.id === result.id) {
      setSelectedResult(null);
    } else {
      setSelectedResult(result);
    }
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    refreshData(newPage + 1);
  };

  return (
    <div className="mt-12">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6" className="font-bold">
            CO2e Factor
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box className="p-4">
            <TableContainer
              component={Paper}
              sx={{ '& th, & td': { border: 'none' } }}
              className="shadow-md rounded-lg"
            >
              <Table sx={{ border: 0 }} aria-label="spanning table">
                <TableHead className="bg-gray-100">
                  <TableRow>
                    <TableCell className="w-12"></TableCell>
                    <TableCell>Year</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Region</TableCell>
                    <TableCell>Database</TableCell>
                    <TableCell>CO2e/Unit</TableCell>
                    <TableCell>Unit Type</TableCell>
                    <TableCell>Total CO2e</TableCell>
                    <TableCell>Other GHGs</TableCell>
                    <TableCell className="w-12"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {activity &&
                    activity?.results?.map((result: Result, index: any) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Checkbox
                            checked={result.id === selectedResult?.id}
                            onChange={() => handleCheckboxChange(result)}
                          />
                        </TableCell>
                        <TableCell>{result.year || '-'}</TableCell>
                        <TableCell>{result.name || '-'}</TableCell>
                        <TableCell>{result.region_name || '-'}</TableCell>
                        <TableCell>{result.source || '-'}</TableCell>
                        <TableCell>{result.factor} kg</TableCell>
                        <TableCell>{result.unit_type || '-'}</TableCell>
                        <TableCell>{result.constituent_gases.co2e_total} kg</TableCell>
                        <TableCell>{result.constituent_gases.co2e_other || '-'}</TableCell>
                        <TableCell>
                          <IconButton>
                            <MoreVertIcon />
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default EstimateTable;
