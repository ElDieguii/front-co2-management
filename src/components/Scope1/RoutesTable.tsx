import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, IconButton, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const RoutesTable = ({ routes, setRoutes, setSelectedRoute }: any) => {
  const handleCheckboxChange = (index: number) => {
    const newRoutes = routes.map((route: any, i: number) => {
      const isChecked = i === index ? !route.checked : false;
      if (isChecked) {
        setSelectedRoute(route);
      }
      return {
        ...route,
        checked: isChecked,
      };
    });
    setRoutes(newRoutes);
  };

  const calculateTotalKm = () => {
    return routes.reduce((acc: any, route: any) => acc + route.km, 0);
  };

  const calculateTotalCo2 = () => {
    return routes.reduce((acc: any, route: any) => acc + route.totalCo2, 0);
  };

  return (
    <div className="mt-12">
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h6" className="font-bold">
            Routes
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper} sx={{ '& th, & td': { border: 'none' } }} className="shadow-md rounded-lg">
            <Table sx={{ border: 0 }} aria-label="spanning table">
              <TableHead className="bg-gray-100">
                <TableRow>
                  <TableCell className="w-12"></TableCell>
                  <TableCell className="w-32">Start</TableCell>
                  <TableCell className="w-40">Final</TableCell>
                  <TableCell className="w-40">Km</TableCell>
                  <TableCell className="w-40">Total of CO2 Emissions</TableCell>
                  <TableCell className="w-12"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {routes &&
                  routes?.map((route: any, index: any) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Checkbox checked={route.checked} onChange={() => handleCheckboxChange(index)} />
                      </TableCell>
                      <TableCell>{route.start}</TableCell>
                      <TableCell>{route.final}</TableCell>
                      <TableCell>{route.km} km</TableCell>
                      <TableCell>{route.totalCo2} kg</TableCell>
                      <TableCell>
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}></TableCell>
                  <TableCell align="left" className="bg-gray-100">
                    Total KM
                  </TableCell>
                  <TableCell align="left" className="bg-gray-100">
                    Total of CO2 Emissions
                  </TableCell>
                  <TableCell className="bg-gray-100"></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}></TableCell>
                  <TableCell align="left">{calculateTotalKm().toFixed(2)} km</TableCell>
                  <TableCell align="left">{calculateTotalCo2().toFixed(2)} kg</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default RoutesTable;
