import { Button, CardMedia, Grid2, Stack, Typography } from "@mui/material";
import BasicTextField from "../common/textField/BasicTextField";
import BasicSelect from "../common/select/BasicSelect";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useTopicInfo from "./useTopicInfo";
import SaveButton from "../common/button/SaveButton";
import EditButton from "../common/button/EditButton";
import { VisuallyHiddenInput } from "shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import DeleteButton from "../common/button/DeleteButton";
import ConfirmDialogV2 from "shared/component/confirmDialog/ConfirmDialogV2";

export default function TopicInfo({ data, setError }) {
  const {
    topic,
    onChangeTitle,
    onChangeSerial,
    onChangeStatus,
    onChangeDescription,
    onChangeImage,
    isEditing,
    handleEditClick,
    handleSaveClick,
    handleDelete,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
  } = useTopicInfo(data, setError);

  return (
    <Stack direction={"column"} spacing={4}>
      {/**Tiêu đề */}
      <Typography variant="h4" textTransform={"uppercase"} fontWeight={"bold"}>
        Topics Detail
      </Typography>
      <Grid2 container direction={"row"} spacing={3}>
        {/**Ảnh và nút thay đổi ảnh */}
        <Grid2 container direction={"column"} spacing={4}>
          <Grid2 container direction={"column"} justifyContent={"center"}>
            <CardMedia
              image={topic.image}
              sx={{ height: "250px", width: "250px" }}
            />
            <Button
              component="label"
              role={undefined}
              variant="text"
              sx={{ color: "#828282", textTransform: "capitalize" }}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              disabled={!isEditing}
            >
              Change image
              <VisuallyHiddenInput
                type="file"
                multiple
                accept="image/*"
                onChange={onChangeImage}
              />
            </Button>
          </Grid2>
          <Grid2 container direction={"row"} spacing={3}>
            <Grid2 item>
              <EditButton
                disabled={isEditing}
                showText
                onEdit={handleEditClick}
              />
            </Grid2>
            <Grid2 item>
              <DeleteButton
                disabled={!isEditing}
                showText
                onDel={handleOpenDialog}
              />
            </Grid2>
            <Grid2 item>
              <SaveButton
                disabled={!isEditing}
                showText
                onSave={handleSaveClick}
              />
            </Grid2>
          </Grid2>
        </Grid2>
        {/**Thông tin */}
        <Grid2 container direction={"column"} spacing={2}>
          <BasicTextField
            label={"Title"}
            value={topic.title}
            onChange={onChangeTitle}
            type="text"
            disabled={!isEditing}
            required
            sx={{ minWidth: "250px" }}
          />
          <BasicTextField
            label={"Serial"}
            value={topic.serial}
            type="number"
            disabled={!isEditing}
            required
            onChange={onChangeSerial}
          />
          <BasicSelect
            label={"Status"}
            value={topic.status}
            onChange={onChangeStatus}
            options={["ACTIVE", "INACTIVE"]}
            required
            disabled={!isEditing}
          />
          <MultiLineTextField
            label={"Description"}
            value={topic.description}
            onChange={onChangeDescription}
            required
            disabled={!isEditing}
          />
        </Grid2>
      </Grid2>
      <ConfirmDialogV2
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this lesson?"
      />
    </Stack>
  );
}
