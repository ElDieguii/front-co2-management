import { ComponentType, ReactNode, useState } from 'react';
import {
  Button,
  Grid,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlurCircularOutlinedIcon from '@mui/icons-material/BlurCircularOutlined';
import { ElectricityIcon, HeatIcon, FuelIcon } from '../assets/icons';
import { useAuthContext } from '../hooks/AuthContext';
import { fetchTotalScopes, updateScope } from '../services/ScopesFunctions';

const CustomScopeCard = ({ totalScopes, setTotalScopes, handleDelete, showToast, scopeNum }: any) => {
  const { token } = useAuthContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentScope, setCurrentScope] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleEdit = (scope: any) => {
    setCurrentScope(scope);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCurrentScope(null);
  };

  const getTotalScopeData = async () => {
    try {
      const res = await fetchTotalScopes(token, 0);
      setTotalScopes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = async () => {
    if (currentScope) {
      if (currentScope.amount === 0 || isNaN(currentScope.amount)) {
        showToast('warning', 'Amount must be different from 0');
        return;
      }
      const editedScope = {
        ...currentScope,
        total: currentScope.co2e * currentScope.amount,
      };

      setLoading(true);
      try {
        await updateScope(token, scopeNum, editedScope);
        await getTotalScopeData();
      } catch (error: any) {
        console.error(error);
        setLoading(false);
        showToast('error', 'An error has appeared: ' + error.message);
      } finally {
        setLoading(false);
        handleClose();
        showToast('success', 'scope was updated successfully');
      }
    } else {
      return;
    }
  };

  const handleChange = (name: string, value: any) => {
    setCurrentScope({ ...currentScope, [name]: value });
  };

  const iconMap: { [key: string]: ComponentType } = {
    Electricity: ElectricityIcon,
    Heat: HeatIcon,
    Fuel: FuelIcon,
  };

  const getIcon = (key: string): ComponentType => {
    return iconMap[key] || BlurCircularOutlinedIcon;
  };

  const getIconByType = (type: string): ReactNode => {
    const IconComponent = getIcon(type);
    return <IconComponent />;
  };

  return (
    <div>
      <Grid container spacing={2}>
        {totalScopes?.map((scope: any) => (
          <Grid item xs={6} key={scope._id}>
            <div className="border-dashed border-2 border-gray-300 p-4 rounded-md flex justify-between items-center">
              <div className="flex flex-col gap-6">
                <div className="flex flex-row items-end">
                  {getIconByType(scope.type)}
                  <Typography className="ml-2 text-base font-semibold">{scope.type}</Typography>
                </div>
                <div className="flex flex-row gap-2">
                  <Typography className="text-gray-600">Total Co2 Factor</Typography>
                  <Typography className="text-[#3EA1DA] font-bold">{scope.total.toFixed(2)}</Typography>
                  <Typography className="text-[#3EA1DA] font-bold">{scope.co2e_unit}</Typography>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outlined"
                  aria-label="edit"
                  className="p-4"
                  color="error"
                  onClick={() => handleDelete(scope)}
                >
                  <DeleteIcon fontSize="small" color="error" />
                </Button>
                <Button variant="contained" className="p-4" aria-label="edit" onClick={() => handleEdit(scope)}>
                  <EditIcon fontSize="small" />
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>

      <Dialog open={modalOpen} onClose={handleClose}>
        <DialogTitle>Edit Scope</DialogTitle>
        <DialogContent>
          {currentScope && (
            <>
              <TextField
                margin="dense"
                name="amount"
                label="Amount"
                type="number"
                fullWidth
                variant="outlined"
                value={currentScope.amount}
                onChange={(e) => handleChange('amount', parseInt(e.target.value))}
              />
              <TextField
                margin="dense"
                name="unit_type"
                label="Unit Type"
                type="text"
                fullWidth
                variant="outlined"
                value={currentScope.unit_type}
                disabled
              />
              {currentScope.energy_source && (
                <TextField
                  margin="dense"
                  name="energy_source"
                  label="Energy Source"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentScope.energy_source}
                  disabled
                />
              )}
              {currentScope.loss_factor && (
                <TextField
                  margin="dense"
                  name="loss_factor"
                  label="Loss Factor"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentScope.loss_factor}
                  disabled
                />
              )}
              {currentScope.fuel_type && (
                <TextField
                  margin="dense"
                  name="fuel_type"
                  label="Fuel Type"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentScope.fuel_type}
                  disabled
                />
              )}
              {currentScope.connection && (
                <TextField
                  margin="dense"
                  name="connection"
                  label="Connection"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentScope.connection}
                  disabled
                />
              )}
              <TextField
                margin="dense"
                name="region"
                label="Region"
                type="text"
                fullWidth
                variant="outlined"
                value={currentScope.region}
                disabled
              />
              <TextField
                margin="dense"
                name="co2e"
                label="Co2 per unit"
                type="text"
                fullWidth
                variant="outlined"
                value={currentScope.co2e.toFixed(3)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
                disabled
              />
              <TextField
                margin="dense"
                name="total"
                label="Total Co2"
                type="text"
                fullWidth
                variant="outlined"
                value={(currentScope.co2e * (currentScope.amount | 0)).toFixed(3)}
                InputProps={{
                  endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                }}
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomScopeCard;
