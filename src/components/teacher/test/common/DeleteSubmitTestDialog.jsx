import React from "react";
import { toast } from "react-toastify";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import { deleteSubmitTests } from "api/test/TestApi";

const DeleteSubmitTestDialog = ({ open, testDelete,dialogCallbacks }) => {
  const handleAgree = async () => {
    try {
      await deleteSubmitTests(testDelete?.id);
      toast.success("All history tests deleted successfully.");
      dialogCallbacks?.onCloseDialog(true); // Xác nhận xóa
    } catch (error) {
      console.error("Error deleting tests:", error);
      toast.error("Failed to delete tests. Please try again.");
      dialogCallbacks?.onCloseDialog(false); // Không xóa được
    }
  };

  const handleDialogClose = () => {
    dialogCallbacks?.onCloseDialog(false); // Người dùng từ chối xóa
  };

  return (
    <ConfirmDialog
      open={open}
      onClose={handleDialogClose}
      onAgree={handleAgree}
      title="Confirm Deletion"
      content={`Are you sure you want to delete all history ${testDelete?.title} ?`}
      cancelText="Cancel"
      agreeText="Delete"
    />
  );
};

export default DeleteSubmitTestDialog;
