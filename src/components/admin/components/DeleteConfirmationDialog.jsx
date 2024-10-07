import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const DeleteConfirmationDialog = ({ open, handleClose, handleDelete }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleDelete} color="error">Yes</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmationDialog;
