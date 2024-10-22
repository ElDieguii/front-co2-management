import { Typography, Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const GroupTable = ({ groups }: any) => {
  return (
    <div className="mt-16">
      {groups.map((group: any, index: any) => (
        <div key={index} className="mb-12">
          <Typography className="text-xl font-medium mb-6">{group.name}</Typography>
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
                  <TableCell>Company</TableCell>
                  <TableCell>Responsable</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.suppliers.map((supplier: any, index: any) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>{supplier.company}</TableCell>
                    <TableCell>{supplier.responsable}</TableCell>
                    <TableCell>{supplier.email}</TableCell>
                    <TableCell>{supplier.phone}</TableCell>
                    <TableCell>{group.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default GroupTable;
