/* eslint-disable array-callback-return */
import { useState } from 'react';
import { Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from 'date-fns';
import TimelineIcon from '@mui/icons-material/Timeline';

const MeasureCards = ({ measure, index, handleSelect, handleDelete }: any) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteOpen = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDeleteOpen(true);
  };

  const handleDeleteClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDeleteOpen(false);
  };

  const handleDeleteOk = (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    setDeleteOpen(false);
    handleDelete();
  };

  return (
    <Card className="p-0" onClick={handleSelect}>
      <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Warning</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Do you want to remove this item?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>No</Button>
          <Button onClick={handleDeleteOk} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <CardContent className="bg-slate-50 hover:bg-slate-100 cursor-pointer p-0">
        <div className="flex items-center">
          <div className="flex items-center flex-wrap me-auto ms-2">
            {index + 1}.
            <TimelineIcon className="ms-2 me-2" style={{ color: measure.color }} />
            <span className="me-2">Until: {format(measure.period_end, 'yyyy-MM-dd')}</span>
            {measure.type}
          </div>
          <IconButton aria-label="delete" onClick={handleDeleteOpen}>
            <DeleteIcon />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default MeasureCards;
