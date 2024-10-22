import { Typography, Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { UserData } from '../../../../types/Primary';

const UserGroupTable = ({ groups }: any) => {
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
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Rol Type</TableCell>
                  <TableCell>Company</TableCell>
                  <TableCell>Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {group.suppliers.map((supplier: UserData, index: any) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell>{supplier.firstName || '-'}</TableCell>
                    <TableCell>{supplier.email || '-'}</TableCell>
                    <TableCell>{supplier.status || '-'}</TableCell>
                    <TableCell>{supplier.role_type || '-'}</TableCell>
                    <TableCell>{supplier.company?.companyName || '-'}</TableCell>
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

export default UserGroupTable;
