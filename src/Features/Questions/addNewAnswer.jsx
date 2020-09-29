import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, Checkbox, DialogTitle, TextField }
  from '@material-ui/core';

export default function AddAnswerDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add New Answer</DialogTitle>
      <DialogContent>
        <TextField
          size="small"
          required
        />
        <Checkbox color="primary" />

      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="default" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary" variant="contained">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
