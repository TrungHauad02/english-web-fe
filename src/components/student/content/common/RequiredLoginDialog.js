// ModalDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const RequiredLoginDialog = ({ open, onClose, onSignIn }) => {
  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>Remind</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You need to sign in to continue. Please sign in to access this page.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onSignIn} color="primary">
          Sign in
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequiredLoginDialog;
