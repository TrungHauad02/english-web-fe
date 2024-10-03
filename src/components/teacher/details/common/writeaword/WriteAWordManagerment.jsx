import { Button, Stack, Typography } from "@mui/material";
import SaveButton from "../button/SaveButton";
import Question from "./Question";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function WriteAWordManagerment() {
  const fakeData = [
    {
      id: "1",
      serial: 1,
      sentence: "The cat is sitting on the.",
      missingWordIndex: 5,
      audioUrl: "/fileListening.mp3",
      correctAnswer: "mat",
    },
  ];

  const [data, setData] = useState(fakeData);

  const handleAddNewQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      serial: data.length + 1,
      sentence: "",
      missingWordIndex: 0,
      audioUrl: "",
      correctAnswer: "",
    };
    setData([...data, newQuestion]);
  };

  const onDelQuestion = (id) => {
    setData(data.filter((question) => question.id !== id));
  };

  return (
    <Stack
      direction={"column"}
      sx={{ backgroundColor: "#FFF4CC", borderRadius: "0.5rem" }}
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
          Write A Word
        </Typography>
        <Stack direction={"row"} spacing={2} sx={{ paddingX: "1rem" }}>
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
