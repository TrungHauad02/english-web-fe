import { Button, Grid2, Typography } from "@mui/material";
import SaveEditDeleteButton from "../button/SaveEditDeleteButton";
import useQuestion from "./useQuestion";
import CustomTextField from "./CustomTextField";
import Answer from "./Answer";

export default function Question({
  data,
  onDelQuestion,
  fetchData,
  setError,
  path,
}) {
  const {
    question,
    isEditing,
    handleEdit,
    handleSave,
    handleAddNewAnswer,
    onChangeQuestionContent,
    onChangeQuestionSerial,
    onChangeExplanation,
    onChangeCorrectAnswer,
    onChangeAnswerContent,
    onDeleteAnswer,
  } = useQuestion(data, fetchData, setError, path);

  const questionContainerStyle = {
    backgroundColor: "#fff",
    borderRadius: "0.5rem",
    padding: "1rem",
    boxShadow: "0 0 0.5rem 0.1rem #00000050",
    zIndex: 2,
  };

  const answerContainerStyle = {
    marginLeft: "1rem",
    marginRight: "0.5rem",
    backgroundColor: "#fff",
    padding: "1rem",
    boxShadow: "0 0 0.5rem 0.1rem #00000050",
    borderRadius: "0 0 0.5rem 0.5rem",
    zIndex: 1,
  };

  return (
    <Grid2
      container
      direction="column"
      sx={{
        marginY: "0.5rem",
      }}
    >
      <Grid2
        container
        direction="row"
        alignItems="center"
        spacing={1}
        sx={questionContainerStyle}
      >
        <Grid2 item>
          <Typography variant="h6" fontWeight={"bold"}>
            Question
          </Typography>
        </Grid2>
        {/* Question serial */}
        <Grid2 item>
          <CustomTextField
            value={question.serial}
            type="number"
            disabled={!isEditing}
            onChange={onChangeQuestionSerial}
          />
        </Grid2>
        <Grid2 item>
          <Typography fontWeight="bold">:</Typography>
        </Grid2>
        <Grid2 item>
          {/* Question content */}
          <CustomTextField
            value={question.content}
            maxWidth="20rem"
            minWidth="22rem"
            disabled={!isEditing}
            onChange={onChangeQuestionContent}
          />
        </Grid2>
        <Grid2 item>
          <SaveEditDeleteButton
            onDel={onDelQuestion}
            onEdit={handleEdit}
            onSave={handleSave}
            showText={false}
            size={"small"}
          />
        </Grid2>
      </Grid2>
      <Grid2 container direction={"column"} sx={answerContainerStyle}>
        <Grid2 container direction={"row"}>
          <Grid2 item size={2}>
            <Typography variant="h6" fontWeight={"bold"}>
              Answers:
            </Typography>
          </Grid2>
          {/* Answers */}
          <Grid2 container direction={"column"} spacing={1}>
            {question.answers.map((answer) => (
              <Answer
                data={answer}
                isEditing={isEditing}
                onChangeAnswerContent={onChangeAnswerContent}
                onChangeCorrectAnswer={onChangeCorrectAnswer}
                onDeleteAnswer={onDeleteAnswer}
              />
            ))}
          </Grid2>
        </Grid2>
        <Grid2 container direction={"row"} alignItems={"center"}>
          <Grid2 item size={2}>
            <Typography variant="h6" fontWeight={"bold"}>
              Explain:
            </Typography>
          </Grid2>
          <Grid2 item size={7}>
            {/* Explanation */}
            <CustomTextField
              disabled={!isEditing}
              sx={{ width: "95%" }}
              value={question.explanation}
              onChange={onChangeExplanation}
            />
          </Grid2>
          <Grid2 item size={3}>
            {/* Add new answer */}
            <Button
              onClick={handleAddNewAnswer}
              variant="contained"
              disabled={!isEditing}
              sx={{ backgroundColor: "#000", color: "#fff" }}
            >
              Add new answer
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
