import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useColor from "shared/color/Color";

export default function ConfirmDialog({
  open,
  onClose,
  onAgree,
  title,
  content,
  cancelText,
  agreeText,
}) {
  const {Color2_1} = useColor();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#fff",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
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
        {cancelText && (
          <Button
            onClick={onClose}
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: "#D9D9D9",
              color: "#000000",
              textTransform: "capitalize",
            }}
          >
            {cancelText}
          </Button>
        )}
        {agreeText && (
          <Button
            onClick={onAgree}
            sx={{
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              backgroundColor: Color2_1,
              color: "#000",
              textTransform: "capitalize",
            }}
          >
            {agreeText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
