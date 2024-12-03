import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import { toast } from 'react-toastify';

const DeleteDialog = ({ open, onClose, onDelete, id, title }) => {
  const handleDelete = () => {
    onDelete(id)
      .then(() => {
        toast.success(title + ' deleted successfully!');
        onClose();
      })
      .catch((error) => {
        toast.error('Failed to delete ' + title);
        onClose();
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to delete "{title}"?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleDelete} color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
