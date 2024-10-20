import { Button, Grid2, Radio, TextField, Typography } from "@mui/material";
import { useState } from "react";
import SaveEditDeleteButton from "../button/SaveEditDeleteButton";
import DeleteButton from "../button/DeleteButton";
import { v4 as uuidv4 } from "uuid";

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
    "& .MuiInputBase-root": {
      fontSize: "1rem",
      padding: "0",
    },
  },
}) => {
  const combinedSx = {
    ...sx,
  };
  return (
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      variant="outlined"
      sx={combinedSx}
    />
  );
};

export default function Question({ data, onDelQuestion }) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  function handleSave() {
    setIsEditing(false);
  }

  function handleAddNewAnswer() {
    if (!isEditing) return;
    const newAnswers = [
      ...question.answers,
      {
        id: uuidv4(),
        content: "",
        correct: false,
      },
    ];
    setQuestion({ ...question, answers: newAnswers });
  }

  function onChangeIsCorrect(e) {
    if (!isEditing) return;
    const newAnswers = [...question.answers];
    newAnswers.forEach((answer) => {
      if (answer.id === e.target.value) {
        answer.correct = true;
      } else {
        answer.correct = false;
      }
    });
    setQuestion({ ...question, answers: newAnswers });
  }

  function onChangeAnswerContent(e, index) {
    if (!isEditing) return;
    const newAnswers = [...question.answers];
    newAnswers[index].content = e.target.value;
    setQuestion({ ...question, answers: newAnswers });
  }

  function onChangeQuestionContent(e) {
    if (!isEditing) return;
    setQuestion({ ...question, content: e.target.value });
  }

  function onChangeQuestionSerial(e) {
    if (!isEditing) return;
    if (e.target.value < 1) return;
    setQuestion({ ...question, serial: e.target.value });
  }

  function onChangeExplanation(e) {
    if (!isEditing) return;
    setQuestion({ ...question, explanation: e.target.value });
  }

  function onDelAnswer(index) {
    if (!isEditing) return;
    const newAnswers = question.answers.filter((_, i) => i !== index);
    setQuestion({ ...question, answers: newAnswers });
  }

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
            onChange={onChangeQuestionSerial}
          />
        </Grid2>
        <Grid2 item>
          <Typography fontWeight="bold">:</Typography>
        </Grid2>
        <Grid2 item>
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
      <Grid2
        container
        direction={"column"}
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
        <Grid2 container direction={"row"}>
          <Grid2 item size={2}>
            <Typography variant="h6" fontWeight={"bold"}>
              Answers:
            </Typography>
          </Grid2>
          <Grid2 container direction={"column"} spacing={1}>
            {question.answers.map((answer, index) => (
              <Grid2
                container
                direction={"row"}
                spacing={1}
                alignItems={"center"}
              >
                <CustomTextField
                  value={answer.content}
                  minWidth={"28rem"}
                  disabled={!isEditing}
                  onChange={(e) => onChangeAnswerContent(e, index)}
                />
                <Radio
                  checked={answer.correct}
                  value={answer.id}
                  onChange={onChangeIsCorrect}
                />
                <DeleteButton
                  onDel={() => onDelAnswer(index)}
                  size={"small"}
                  showText={false}
                />
              </Grid2>
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
            <CustomTextField
              disabled={!isEditing}
              sx={{ width: "95%" }}
              value={question.explanation}
              onChange={onChangeExplanation}
            />
          </Grid2>
          <Grid2 item size={3}>
            <Button
              onClick={handleAddNewAnswer}
              variant="contained"
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
