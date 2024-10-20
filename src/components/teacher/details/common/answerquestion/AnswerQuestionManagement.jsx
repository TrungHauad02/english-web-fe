import { Button, Grid2, Stack, Typography } from "@mui/material";
import Question from "./Question";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SaveButton from "../button/SaveButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SoundViewer from "../../../../common/soundViewer/SoundViewer";
import { VisuallyHiddenInput } from "../../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";

export default function AnswerQuestionManagement({
  isListening,
  file,
  onChangeFile,
  data,
}) {
  const [localData, setLocalData] = useState(data);
  console.log(data);

  function handleAddNewQuestion() {
    const newQuestion = {
      id: uuidv4(),
      serial: localData.length + 1,
      content: "",
      explanation: "",
      answers: [{ id: uuidv4(), content: "", isCorrect: true }],
    };
    setLocalData([...localData, newQuestion]);
  }

  function onDelQuestion(id) {
    const newData = localData.filter((question) => question.id !== id);
    setLocalData(newData);
  }

  return (
    <Stack
      direction={"column"}
      sx={{
        backgroundColor: "#f1f1f1",
        borderRadius: "0.25rem",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: "1rem 0",
          zIndex: 3,
          boxShadow: "0 0 0.5rem 0.1rem #00000050",
        }}
      >
        <Typography
          variant="h4"
          textTransform={"uppercase"}
          fontWeight={"bold"}
          sx={{ marginX: "2rem" }}
        >
          Answer Question
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ paddingX: "1rem" }}>
          <SaveButton showText={true} size={"large"} />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#fff", color: "#000" }}
            onClick={handleAddNewQuestion}
          >
            Add new question
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ padding: "1rem" }}>
        {/** Audio file */}
        {isListening && (
          <Grid2 container direction={"row"} alignItems="center" spacing={1}>
            <Grid2 item size={2}>
              <Typography variant="h6">Audio file:</Typography>
            </Grid2>
            <Grid2 item size={8}>
              <SoundViewer audioSrc={file} />
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
        )}
        {/** Questions */}
        {localData.map((question) => (
          <Question
            key={question.id}
            data={question}
            onDelQuestion={() => onDelQuestion(question.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
