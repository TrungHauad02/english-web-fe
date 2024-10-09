import { Button, Card, Grid2, Typography } from "@mui/material";
import { styled } from "@mui/system";
import ProcessBar from "./ProcessBar";
import { useState } from "react";
import PrevNextSubmitButton from "../../../common/button/PrevNextSubmitButton";
import ListOptions from "./ListOptions";
import Explaination from "./Explaination";

const Title = styled("h4")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: "1rem 0",
  color: "#000",
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

function AnswerQuestion({ listQuestion }) {
  const [curIndex, setCurIndex] = useState(0);
  const question = listQuestion[curIndex];
  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);

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

  const getUserAnswer = (questionId) => {
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
        backgroundColor: "#f1f1f1",
        position: "relative",
      }}
    >
      <Title>Answer Question</Title>
      <ProcessBar
        questionNumber={curIndex + 1}
        totalQuestions={listQuestion.length}
      />
      <Grid2 container direction={"column"}>
        <Question index={curIndex + 1} content={question.content} />
        <Grid2 container direction={"row"} justifyContent={"space-between"}>
          <ListOptions
            listAnswer={question.options}
            value={getUserAnswer(question.id)}
            sx={{ marginY: "1rem", marginX: "1rem" }}
            onChange={handleChange}
          />
          {isShowExplain && (
            <Explaination
              explaination={question.explaination}
              sx={{
                marginRight: "1rem",
                backgroundColor: "#6ec3f77f",
              }}
            />
          )}
        </Grid2>
        {isSubmit && (
          <Button
            variant="contained"
            onClick={() => setIsShowExplain(!isShowExplain)}
            sx={{
              margin: "1rem",
              width: "12rem",
              backgroundColor: "#6EC2F7",
              position: "absolute",
              bottom: "0",
            }}
          >
            {isShowExplain ? "Hide" : "Show"} explaination
          </Button>
        )}
      </Grid2>
      <PrevNextSubmitButton
        handleNext={handleNext}
        handlePrevious={handlePrevious}
        submitContent={getSubmitContent()}
        scoreContent={getScoreContent()}
        onSubmit={() => setIsSubmit(true)}
      />
    </Card>
  );
}

export default AnswerQuestion;
