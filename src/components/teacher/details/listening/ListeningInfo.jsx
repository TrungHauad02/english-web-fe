import { Button, CardMedia, Grid2, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BasicTextField from "../common/textField/BasicTextField";
import BasicSelect from "../common/select/BasicSelect";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import { VisuallyHiddenInput } from "shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useListeningInfo from "./useListeningInfo";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import ErrorComponent from "shared/component/error/ErrorComponent";
import EditButton from "../common/button/EditButton";
import DeleteButton from "../common/button/DeleteButton";
import SaveButton from "../common/button/SaveButton";
import ConfirmDialogV2 from "shared/component/confirmDialog/ConfirmDialogV2";

export default function ListeningInfo() {
  const {
    topic,
    isEditing,
    handleEditing,
    handleDelete,
    handleSave,
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
  } = useListeningInfo();

  if (!topic) return;
  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Typography variant="h4" textTransform={"uppercase"} fontWeight={"bold"}>
        Listening Detail
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
      <Grid2
        container
        size={6}
        direction={"column"}
        sx={{ width: "100%" }}
        spacing={2}
      >
        <MultiLineTextField
          label={"Description"}
          value={topic.description}
          onChange={onChangeDescription}
          disabled={!isEditing}
          required
        />
        <Grid2 sx={{ marginY: 0 }}>
          <Button
            component="label"
            role={undefined}
            variant="text"
            sx={{
              color: "#000",
              textTransform: "capitalize",
              paddingX: "1.5rem",
              boxShadow: "1px 2px 2px #00000046",
            }}
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            disabled={!isEditing}
          >
            Upload audio
            <VisuallyHiddenInput
              type="file"
              multiple
              accept="audio/*"
              onChange={onChangeFile}
            />
          </Button>
        </Grid2>
        <Grid2 sx={{ width: "100%" }}>
          <SoundViewer audioSrc={topic.audioUrl} />
        </Grid2>
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
      {/**Hiển thị khi có lỗi */}
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
