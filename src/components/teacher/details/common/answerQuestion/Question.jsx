import { Button, Grid2, Typography } from "@mui/material";
import SaveEditDeleteButton from "../button/SaveEditDeleteButton";
import useQuestion from "./useQuestion";
import CustomTextField from "./CustomTextField";
import Answer from "./Answer";
import BasicSelect from "../select/BasicSelect";

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
    onChangeAnswerStatus,
    onChangeStatus,
    onDeleteAnswer,
  } = useQuestion(data, fetchData, setError, path);

  const questionContainerStyle = {
    backgroundColor: "#fff",
    borderRadius: "0.3rem",
    padding: "0.5rem",
    boxShadow: "0 0 0.3rem 0.05rem #00000030",
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
        marginY: "0.3rem",
      }}
    >
      <Grid2
        container
        direction="row"
        alignItems="center"
        spacing={1}
        justifyContent={"flex-start"}
        sx={questionContainerStyle}
      >
        <Grid2 item>
          <Typography variant="subtitle1" fontWeight={"bold"}>
            Question
          </Typography>
        </Grid2>
        {/* Question serial */}
        <Grid2 item>
          <CustomTextField
            value={question.serial}
            type="number"
            required
            disabled={!isEditing}
            onChange={onChangeQuestionSerial}
            sx={{
              width: "4rem",
              "& .MuiInputBase-root": {
                fontSize: "0.85rem",
              },
            }}
          />
        </Grid2>
        <Grid2 item>
          <Typography fontWeight="bold">:</Typography>
        </Grid2>
        <Grid2 item>
          {/* Question content */}
          <CustomTextField
            value={question.content}
            required
            maxWidth="20rem"
            minWidth={"18rem"}
            disabled={!isEditing}
            onChange={onChangeQuestionContent}
          />
        </Grid2>
        <Grid2 item sx={{ marginTop: "-0.5rem" }}>
          <BasicSelect
            disabled={!isEditing}
            options={["ACTIVE", "INACTIVE"]}
            value={question.status}
            onChange={onChangeStatus}
            sx={{ minWidth: "6.8rem" }}
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
            <Typography variant="subtitle1" fontWeight={"bold"}>
              Answers:
            </Typography>
          </Grid2>
          {/* Answers */}
          <Grid2 container direction={"column"} spacing={1}>
            {question.answers.map((answer, index) => (
              <Answer
                data={answer}
                isEditing={isEditing}
                onChangeAnswerContent={(e) => onChangeAnswerContent(e, index)}
                onChangeCorrectAnswer={onChangeCorrectAnswer}
                onDeleteAnswer={() => onDeleteAnswer(answer.id, index)}
                onChangeAnswerStatus={(e) => onChangeAnswerStatus(e, index)}
              />
            ))}
          </Grid2>
        </Grid2>
        <Grid2 container direction={"row"} alignItems={"center"}>
          <Grid2 item size={2}>
            <Typography variant="subtitle1" fontWeight={"bold"}>
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
              required
            />
          </Grid2>
          <Grid2 item size={3}>
            {/* Add new answer */}
            <Button
              onClick={handleAddNewAnswer}
              variant="contained"
              disabled={!isEditing}
              sx={{
                backgroundColor: "#000",
                color: "#fff",
                textTransform: "capitalize",
                fontSize: "0.85rem",
              }}
            >
              Add new answer
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
