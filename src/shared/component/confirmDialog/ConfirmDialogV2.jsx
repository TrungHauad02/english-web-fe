import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { DeleteForever as DeleteIcon } from "@mui/icons-material";

const ConfirmDialogV2 = ({ open, onClose, onConfirm, message }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{ backgroundColor: "#f44336", color: "white" }}
      >
        <Typography variant="h6" component="span">
          <DeleteIcon sx={{ mr: 1 }} /> Delete Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "16px" }}>
        <Typography
          id="confirm-dialog-description"
          variant="body1"
          color="textSecondary"
          sx={{ marginY: "2rem" }}
        >
          {message}
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Typography variant="body2" color="error" sx={{ fontWeight: "bold" }}>
          Note: This action cannot be undone!
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button
          onClick={onClose}
          color="primary"
          variant="outlined"
          sx={{ marginRight: 1, textTransform: "none" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm();
            onClose();
          }}
          color="error"
          variant="contained"
          sx={{
            backgroundColor: "#d32f2f",
            textTransform: "none",
            "&:hover": { backgroundColor: "#c62828" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogV2;
