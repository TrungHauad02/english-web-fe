import { Button, CardMedia, Grid2, Stack, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BasicTextField from "../common/textField/BasicTextField";
import BasicSelect from "../common/select/BasicSelect";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import { VisuallyHiddenInput } from "../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useReadingInfo from "./useReadingInfo";
import ErrorComponent from "shared/component/error/ErrorComponent";
import EditButton from "../common/button/EditButton";
import DeleteButton from "../common/button/DeleteButton";
import SaveButton from "../common/button/SaveButton";
import ConfirmDialogV2 from "shared/component/confirmDialog/ConfirmDialogV2";

export default function ReadingInfo({ data, setData }) {
  const {
    topic,
    isEditing,
    handleEditing,
    handleSave,
    handleDelete,
    onChangeImage,
    onChangeTitle,
    onChangeSerial,
    onChangeStatus,
    onChangeDescription,
    onChangeFile,
    error,
    handleCloseError,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
  } = useReadingInfo(data, setData);

  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Typography variant="h4" textTransform={"uppercase"} fontWeight={"bold"}>
        Reading Detail
      </Typography>
      <Grid2 container size={6} direction={"row"} sx={{ width: "100%" }}>
        <Grid2 container spacing={2} direction={"column"}>
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
        <Grid2 container direction={"column"}>
          <BasicTextField
            label={"Title"}
            value={topic.title}
            onChange={onChangeTitle}
            type="text"
            sx={{ minWidth: "250px" }}
            disabled={!isEditing}
            required
          />
          <BasicTextField
            label={"Serial"}
            value={topic.serial}
            type="number"
            onChange={onChangeSerial}
            disabled={!isEditing}
            required
          />
          <BasicSelect
            label={"Status"}
            value={topic.status}
            onChange={onChangeStatus}
            options={["ACTIVE", "INACTIVE"]}
            disabled={!isEditing}
            required
          />
        </Grid2>
      </Grid2>
      <Grid2 container size={6} direction={"column"} sx={{ width: "70%" }}>
        <MultiLineTextField
          label={"Description"}
          value={topic.description}
          onChange={onChangeDescription}
          disabled={!isEditing}
          required
        />
        <Grid2 container direction={"column"} spacing={2}>
          <Button
            component="label"
            role={undefined}
            variant="text"
            sx={{
              color: "#000",
              backgroundColor: "#D7ED6D",
              width: "fit-content",
              padding: "0.5rem 2rem",
              textTransform: "initial",
            }}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disabled={!isEditing}
          >
            Upload file pdf
            <VisuallyHiddenInput
              type="file"
              multiple
              accept="application/pdf"
              onChange={onChangeFile}
            />
          </Button>
          <Stack direction={"row"} spacing={2}>
            <EditButton onEdit={handleEditing} disabled={isEditing} showText />
            <DeleteButton
              onDel={handleOpenDialog}
              disabled={!isEditing}
              showText
            />
            <SaveButton onSave={handleSave} disabled={!isEditing} showText />
          </Stack>
        </Grid2>
      </Grid2>
      {/* Hiện thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
      <ConfirmDialogV2
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this lesson?"
      />
    </Grid2>
  );
}
