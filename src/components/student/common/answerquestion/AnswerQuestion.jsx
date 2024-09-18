import { Box, Card, Grid2, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ProcessBar from "./ProcessBar";
import { useState } from "react";
import PrevNextSubmitButton from "../../../common/button/PrevNextSubmitButton";
import ListOptions from "./ListOptions";

const Title = styled("h4")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: "1rem 0",
});

function Question({ index, content }) {
  return (
    <Grid2 container spacing={2} sx={{ marginY: "1rem", marginLeft: "1rem" }}>
      <Typography
        variant="body"
        component="body"
        sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
      >
        Question {index}:{" "}
      </Typography>
      <Typography variant="body" component="body" sx={{ fontSize: "1.25rem" }}>
        {content}
      </Typography>
    </Grid2>
  );
}

function AnswerQuestion({listQuestion}) {
  const [curIndex, setCurIndex] = useState(0);
  const question = listQuestion[curIndex];
  const [userAnswer, setUserAnswer] = useState(null);

  const handleChange = (e) => {
    const answer = {
      questionId: question.id,
      answerId: e.target.value,
    };

    setUserAnswer((prevAnswers) => ({
      ...prevAnswers,
      [question.id]: answer.answerId,
    }));
  };

  const getUserAnwser = (questionId) => {
    if (!userAnswer) return null;
    return userAnswer[questionId] || null;
  };

  const handlePrevious = () => {
    if (curIndex === 0) return;
    setCurIndex((prevIndex) => prevIndex - 1);
  };
  const handleNext = () => {
    if (curIndex === listQuestion.length - 1) return;
    setCurIndex((prevIndex) => prevIndex + 1);
  };

  const getSubmitContent = () => {
    const total = listQuestion.length;
    const answered = Object.keys(userAnswer || {}).length;
    return `Answered questions: ${answered} out of ${total}. Do you want to finish?`;
  };

  const getScoreContent = () => {
    let score = 0;
    const total = listQuestion.length;
    Object.entries(userAnswer || {}).forEach(([questionId, answerId]) => {
      const question = listQuestion.find((q) => q.id === questionId);
      if (question) {
        const selectedOption = question.options.find((o) => o.id === answerId);
        if (selectedOption && selectedOption.isCorrect) {
          score++;
        }
      }
    });

    return `Your Score: ${score}/${total}`;
  };

  return (
    <Card
      sx={{
        marginX: "5%",
        marginY: "2rem",
        padding: "1rem",
        backgroundColor: "#F0F6D4",
      }}
    >
      <Title>Answer Question</Title>
      <ProcessBar
        questionNumber={curIndex + 1}
        totalQuestions={listQuestion.length}
      />
      <Box>
        <Question index={curIndex + 1} content={question.content} />
        <ListOptions
          listAnswer={question.options}
          value={getUserAnwser(question.id)}
          sx={{ marginY: "1rem", marginX: "1rem" }}
          onChange={handleChange}
        />
      </Box>
      <PrevNextSubmitButton
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        submitConent={getSubmitContent()}
        scoreContent={getScoreContent()}
      />
    </Card>
  );
}

export default AnswerQuestion;
