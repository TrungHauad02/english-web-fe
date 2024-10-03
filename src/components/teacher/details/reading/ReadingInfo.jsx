import { Button, CardMedia, Grid2, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import BasicTextField from "../common/textField/BasicTextField";
import BasicSelect from "../common/select/BasicSelect";
import MultiLineTextField from "../common/textField/MultiLineTextField";
import SaveEditDeleteButton from "../common/button/SaveEditDeleteButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
export default function ReadingInfo({ data, setData }) {
  const [topic, setTopic] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  const hanleEditing = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    setData(topic);
  };

  const onChangeImage = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTopic({ ...topic, img: imageUrl });
    }
  };

  const onChangeTitle = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, title: e.target.value });
  };
  const onChangeSerial = (e) => {
    if (!isEditing) return;
    if (e.target.value <= 0) return;
    setTopic({ ...topic, serial: e.target.value });
  };

  const onChangeStatus = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, status: e.target.value });
  };

  const onChangeDescription = (e) => {
    if (!isEditing) return;
    setTopic({ ...topic, description: e.target.value });
  };

  const onChangeFile = (e) => {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setTopic({ ...topic, file: fileUrl });
      setData({ ...topic, file: fileUrl });
    }
  };

  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Typography variant="h4" textTransform={"uppercase"} fontWeight={"bold"}>
        Reading Detail
      </Typography>
      <Grid2 container size={6} direction={"row"} sx={{ width: "100%" }}>
        <Grid2 container spacing={2} direction={"column"}>
          <CardMedia
            image={topic.img}
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
            options={["active", "inactive"]}
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
            Upload file .md
            <VisuallyHiddenInput
              type="file"
              multiple
              accept=".md"
              onChange={onChangeFile}
            />
          </Button>
          <SaveEditDeleteButton
            showText
            onedit={hanleEditing}
            onsave={handleSave}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
