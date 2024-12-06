import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { toast } from "react-toastify";
import { deleteSubmitTest } from "api/test/submitTest";

const ConfirmDialogDeleteSubmitTest = ({
  open,
  onClose,
  submitTests,
  content,
  cancelText = "Cancel",
  agreeText = "Delete",
}) => {
  const handleAgree = async () => {
    try {
      for (const testId of submitTests) {
        await deleteSubmitTest(testId);
      }
      toast.success(`${submitTests.length} items deleted successfully!`);
      onClose();
    } catch (error) {
      toast.error("Failed to delete items. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {cancelText}
        </Button>
        <Button onClick={handleAgree} color="primary">
          {agreeText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogDeleteSubmitTest;
