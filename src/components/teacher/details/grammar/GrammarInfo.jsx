import { Button, CardMedia, Grid2, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import BasicTextField from "../common/textField/BasicTextField";
import BasicSelect from "../common/select/BasicSelect";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import { VisuallyHiddenInput } from "../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useGrammarInfo from "./useGrammarInfo";
import DeleteButton from "../common/button/DeleteButton";
import EditButton from "../common/button/EditButton";
import SaveButton from "../common/button/SaveButton";

export default function GrammarInfo({ data, setData }) {
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
    onChangeContent,
    onChangeDescription,
    onChangeExample,
    onChangeFile,
  } = useGrammarInfo(data, setData);

  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Typography variant="h4" textTransform={"uppercase"} fontWeight={"bold"}>
        Grammar Detail
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
            sx={{ color: "#828282" }}
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
          />
          <BasicTextField
            label={"Serial"}
            value={topic.serial}
            type="number"
            onChange={onChangeSerial}
            disabled={!isEditing}
          />
          <BasicSelect
            label={"Status"}
            value={topic.status}
            onChange={onChangeStatus}
            options={["ACTIVE", "INACTIVE"]}
            disabled={!isEditing}
          />
        </Grid2>
      </Grid2>
      <Grid2 container size={6} direction={"column"} sx={{ width: "70%" }}>
        <MultiLineTextField
          label={"Description"}
          value={topic.description}
          onChange={onChangeDescription}
          disabled={!isEditing}
        />
        <MultiLineTextField
          label={"Content"}
          value={topic.content}
          onChange={onChangeContent}
          disabled={!isEditing}
        />
        <MultiLineTextField
          label={"Example"}
          value={topic.example}
          onChange={onChangeExample}
          disabled={!isEditing}
        />
        <Grid2 container direction={"row"} spacing={2}>
          <Button
            component="label"
            role={undefined}
            variant="text"
            sx={{
              color: "#000",
              backgroundColor: "#D7ED6D",
              width: "fit-content",
              padding: "0.5rem 2rem",
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
          <Grid2
            container
            direction="row"
            spacing={1}
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid2 item>
              <EditButton
                disabled={isEditing}
                showText
                onEdit={handleEditing}
              />
            </Grid2>
            <Grid2 item>
              <DeleteButton
                disabled={!isEditing}
                showText
                onDel={handleDelete}
              />
            </Grid2>
            <Grid2 item>
              <SaveButton disabled={!isEditing} showText onSave={handleSave} />
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
