import { Button, Grid2, Stack, Typography } from "@mui/material";
import Question from "./Question";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SoundViewer from "../../../../common/soundViewer/SoundViewer";
import { VisuallyHiddenInput } from "../../../../../shared/component/visuallyHiddenInput/VisuallyHiddenInput";
import useAnswerQuestion from "./useAnswerQuestion";

export default function AnswerQuestionManagement({
  isListening,
  file,
  onChangeFile,
  data,
  fetchData,
}) {
  const { localData, handleAddNewQuestion, onDelQuestion } = useAnswerQuestion(
    data,
    fetchData
  );

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
            fetchData={fetchData}
            onDelQuestion={() => onDelQuestion(question.id)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
