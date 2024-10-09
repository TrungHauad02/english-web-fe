import { useState } from "react";
import ConfirmDialog from "./ConfirmDialog";
import { Box } from "@mui/material";
import BasicButton from "../../common/button/BasicButton";

function ConfirmAndSubmit({ submitContent, scoreContent, sx, onSubmit }) {
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);

  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };
  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };
  const handleScoreDialogClose = () => {
    setScoreDialogOpen(false);
  };
  const handleAgreeClick = () => {
    setScoreDialogOpen(false);
    if (onSubmit) onSubmit();
  };
  const handleSubmitClick = () => {
    setConfirmDialogOpen(false);
    setScoreDialogOpen(true);
  };
  return (
    <Box>
      <BasicButton onClick={handleConfirmDialogOpen} sx={sx} />
      <ConfirmDialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        onAgree={handleSubmitClick}
        title="Confirmation"
        content={submitContent}
        cancelText={"Cancel"}
        agreeText={"Submit"}
      />
      <ConfirmDialog
        open={scoreDialogOpen}
        onClose={handleScoreDialogClose}
        onAgree={handleAgreeClick}
        title="Submit"
        content={scoreContent}
        agreeText={"Ok"}
      />
    </Box>
  );
}

export default ConfirmAndSubmit;
