import { Button, Stack, Typography } from "@mui/material";
import Question from "./Question";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import SaveButton from "../button/SaveButton";

export default function AnswerQuestionManagerment() {
  const fakeData = [
    {
      id: "1",
      serial: 1,
      content: "What is the capital of France?",
      explaination: "Paris is the capital of France",
      answers: [
        {
          id: "1",
          content: "Paris",
          isCorrect: true,
        },
        {
          id: "2",
          content: "London",
          isCorrect: false,
        },
        {
          id: "3",
          content: "Berlin",
          isCorrect: false,
        },
      ],
    },
    {
      id: "2",
      serial: 2,
      content: "What is the capital of Germany?",
      explaination: "Berlin is the capital of Germany",
      answers: [
        {
          id: "1",
          content: "Paris",
          isCorrect: false,
        },
        {
          id: "2",
          content: "London",
          isCorrect: false,
        },
        {
          id: "3",
          content: "Berlin",
          isCorrect: true,
        },
      ],
    },
  ];

  const [data, setData] = useState(fakeData);

  function handleAddNewQuestion() {
    const newQuestion = {
      id: uuidv4(),
      serial: data.length + 1,
      content: "",
      explaination: "",
      answers: [{ id: uuidv4(), content: "", isCorrect: true }],
    };
    setData([...data, newQuestion]);
  }

  function onDelQuestion(id) {
    const newData = data.filter((question) => question.id !== id);
    setData(newData);
  }

  return (
    <Stack
      direction={"column"}
      sx={{
        backgroundColor: "#FFF4CC",
        borderRadius: "0.5rem",
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#FFF4CC",
          padding: "0.5rem 0",
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
        <Stack direction={"row"} spacing={2}>
          <SaveButton showText={true} size={"large"} />
          <Button
            variant="contained"
            sx={{ backgroundColor: "#ACCD0A", color: "#000" }}
            onClick={handleAddNewQuestion}
          >
            Add new question
          </Button>
        </Stack>
      </Stack>
      <Stack sx={{ padding: "1rem" }}>
        {data.map((question) => (
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
