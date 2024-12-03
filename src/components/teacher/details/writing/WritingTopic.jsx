import { Grid2 } from "@mui/material";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import useWritingTopic from "./useWritingTopic";
import SaveButton from "../common/button/SaveButton";
import EditButton from "../common/button/EditButton";
import DeleteButton from "../common/button/DeleteButton";
import ConfirmDialogV2 from "shared/component/confirmDialog/ConfirmDialogV2";

export default function WritingTopic({
  data,
  setData,
  isEditing,
  setIsEditing,
  setError,
}) {
  const {
    handleEditing,
    handleSave,
    handleDelete,
    onChangeDescription,
    onChangeTopic,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
  } = useWritingTopic(data, setData, isEditing, setIsEditing, setError);

  return (
    <Grid2
      container
      direction={"column"}
      spacing={4}
      sx={{ marginTop: "4.25rem" }}
    >
      <Grid2 container size={6} direction={"column"} sx={{ width: "70%" }}>
        <MultiLineTextField
          label={"Description"}
          value={data.description}
          onChange={onChangeDescription}
          disabled={!isEditing}
        />
        <MultiLineTextField
          label={"Topic"}
          value={data.topic}
          onChange={onChangeTopic}
          disabled={!isEditing}
        />
        <Grid2 container direction={"row"} spacing={2}>
          <EditButton onEdit={handleEditing} disabled={isEditing} showText />
          <DeleteButton
            onDel={handleOpenDialog}
            disabled={!isEditing}
            showText
          />
          <SaveButton onSave={handleSave} disabled={!isEditing} showText />
        </Grid2>
      </Grid2>
      <ConfirmDialogV2
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this lesson?"
      />
    </Grid2>
  );
}
