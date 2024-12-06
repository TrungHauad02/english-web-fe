import React from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { deleteSubmitTest } from "api/test/submitTest";

const DeleteSubmitTestDialog = ({ open, onClose, submitTestIds, content }) => {
  const handleAgree = async () => {
    try {
      if (Array.isArray(submitTestIds) && submitTestIds.length > 0) {
        const deletePromises = submitTestIds.map((id) => deleteSubmitTest(id));
        await Promise.all(deletePromises);

        toast.success("All history tests deleted successfully.");
        onClose();
      } else {
        console.warn("submitTestIds is empty or invalid.");
        toast.error("No tests selected for deletion.");
      }
    } catch (error) {
      console.error("Error deleting tests:", error);
      toast.error("Failed to delete tests. Please try again.");
    }
  };

  const handleDialogClose = () => {
    onClose();
  };

  return (
    <ConfirmDialog
      open={open}
      onClose={handleDialogClose}
      onAgree={handleAgree}
      title="Confirm Deletion"
      content={content || "Are you sure you want to delete the selected history?"}
      cancelText="Cancel"
      agreeText="Delete"
    />
  );
};

export default DeleteSubmitTestDialog;
