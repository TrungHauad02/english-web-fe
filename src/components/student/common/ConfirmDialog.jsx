import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmDialog({
  open,
  onClose,
  onAgree,
  title,
  content,
  cancelText,
  agreeText,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#C8DD66",
          textAlign: "center",
          padding: "1rem",
        },
      }}
    >
      <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <p id="confirm-dialog-description">{content}</p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#F0FAC1",
            color: "#000000",
          }}
        >
          {cancelText}
        </Button>
        {agreeText && (
          <Button
            onClick={onAgree}
            sx={{
              backgroundColor: "#ACCD0A",
              color: "#FFFFFF",
            }}
          >
            {agreeText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
