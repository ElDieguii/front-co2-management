import {
  Checkbox,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const SupplierTable = ({ rows, handleCheckboxChange }: any) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        '& th, & td': {
          border: 'none',
        },
      }}
      className="shadow-md rounded-lg"
    >
      <Table sx={{ border: 0 }}>
        <TableHead className="bg-gray-100">
          <TableRow>
            <TableCell className="w-12"></TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Responsable</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Group</TableCell>
            <TableCell className="w-12"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any, index: any) => (
            <TableRow key={index} className="hover:bg-gray-50">
              <TableCell>
                <Checkbox checked={row.checked} onChange={() => handleCheckboxChange(index)} />
              </TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.responsable}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>{row.group}</TableCell>
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
  );
};

export default SupplierTable;
