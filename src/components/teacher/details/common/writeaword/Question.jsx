import { Button, Grid2, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import SaveEditDeleteButton from "../button/SaveEditDeleteButton";
import SoundViewer from "../../../../common/soundViewer/SoundViewer";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const CustomTextField = ({
  value,
  onChange,
  maxWidth = "4rem",
  minWidth,
  disabled,
  type = "text",
  sx = {
    maxWidth: maxWidth,
    minWidth: minWidth,
    "& .MuiInputBase-root": { fontSize: "1rem", padding: "0" },
  },
}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      variant="outlined"
      sx={sx}
    />
  );
};
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
export default function Question({ data, onDelQuestion }) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!data) return;
    if (!data.sentence.includes("___")) {
      const words = data.sentence.split(" ");

      const index = data.missingWordIndex;
      if (index >= 0 && index <= words.length) {
        words.splice(index, 0, "___");
      } else {
        return;
      }
      const updatedSentence = words.join(" ");
      setQuestion({ ...data, sentence: updatedSentence });
    } else {
      setQuestion(data);
    }
  }, [data]);
  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
  }

  function onChangeField(e, field) {
    if (!isEditing) return;
    setQuestion({ ...question, [field]: e.target.value });
  }

  function onChangeWordIndex(e) {
    if (!isEditing || e.target.value < 0) return;
    const index = e.target.value;
    const sentenceWithoutPlaceholder = question.sentence.replace("___", "");
    const words = sentenceWithoutPlaceholder.split(" ").filter(Boolean);

    if (index >= words.length + 1) {
      return;
    }

    words.splice(index, 0, "___");

    const updatedSentence = words.join(" ");

    setQuestion({
      ...question,
      sentence: updatedSentence,
      missingWordIndex: index,
    });
  }

  function onChangeSerial(e) {
    if (!isEditing || e.target.value < 1) return;
    setQuestion({ ...question, serial: e.target.value });
  }

  function onChangeSentence(e) {
    if (!isEditing || !e.target.value.includes("___")) return;
    setQuestion({ ...question, sentence: e.target.value });
  }

  function onChangeFile(e) {
    if (!isEditing) return;
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setQuestion({ ...question, audioUrl });
    }
  }

  return (
    <Grid2 container direction="column" sx={{ marginY: "0.5rem" }}>
      <Grid2
        container
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "0.5rem",
          padding: "1rem",
          boxShadow: "0 0 0.5rem 0.1rem #00000050",
          zIndex: 2,
        }}
      >
        <Grid2 item>
          <Typography variant="h6" fontWeight={"bold"}>
            Question
          </Typography>
        </Grid2>
        <Grid2 item>
          <CustomTextField
            value={question.serial}
            type="number"
            disabled={!isEditing}
            onChange={(e) => onChangeSerial(e)}
          />
        </Grid2>
        <Grid2 item>
          <Typography fontWeight="bold">:</Typography>
        </Grid2>
        <Grid2 item>
          <CustomTextField
            value={question.sentence}
            maxWidth="20rem"
            minWidth="22rem"
            disabled={!isEditing}
            onChange={(e) => onChangeSentence(e)}
          />
        </Grid2>
        <Grid2 item>
          <SaveEditDeleteButton
            ondel={onDelQuestion}
            onedit={handleEdit}
            onsave={handleSave}
            showText={false}
            size={"small"}
          />
        </Grid2>
      </Grid2>

      <Grid2
        container
        direction={"column"}
        spacing={2}
        sx={{
          marginLeft: "1rem",
          marginRight: "0.5rem",
          backgroundColor: "#fff",
          padding: "1rem",
          boxShadow: "0 0 0.5rem 0.1rem #00000050",
          borderRadius: "0 0 0.5rem 0.5rem",
          zIndex: 1,
        }}
      >
        <Grid2 container direction={"row"} alignItems="center">
          <Grid2 item>
            <Typography variant="h6" fontWeight={"bold"}>
              Missing Word Index:
            </Typography>
          </Grid2>
          <Grid2 item>
            <CustomTextField
              value={question.missingWordIndex}
              type="number"
              disabled={!isEditing}
              onChange={(e) => onChangeWordIndex(e)}
            />
          </Grid2>
        </Grid2>

        <Grid2 container direction={"row"} alignItems="center" spacing={1}>
          <Grid2 item size={1}>
            <Typography variant="h6" fontWeight={"bold"}>
              Audio:
            </Typography>
          </Grid2>
          <Grid2 item size={9}>
            <SoundViewer audioSrc={question.audioUrl} />
          </Grid2>
          <Grid2 item size={2}>
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
              Upload file
              <VisuallyHiddenInput
                type="file"
                multiple
                accept="audio/*"
                onChange={onChangeFile}
              />
            </Button>
          </Grid2>
        </Grid2>

        <Grid2 container direction={"row"} spacing={4} alignItems="center">
          <Grid2 item>
            <Typography variant="h6" fontWeight={"bold"}>
              Correct Answer:
            </Typography>
          </Grid2>
          <Grid2 item>
            <CustomTextField
              minWidth="8rem"
              maxWidth="12rem"
              value={question.correctAnswer}
              disabled={!isEditing}
              onChange={(e) => onChangeField(e, "correctAnswer")}
            />
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
