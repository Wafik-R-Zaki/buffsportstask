import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle }
  from '@material-ui/core';

export default function ConfirmDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this question?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Delete
        </Button>
        <Button onClick={handleClose} color="default" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
