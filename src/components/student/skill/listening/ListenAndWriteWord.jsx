import { Box, Button, TextField, Typography } from "@mui/material";
import SoundViewer from "../../../common/soundViewer/SoundViewer";
import { useState } from "react";
import { listListeningWriteWord } from "./listListening";
import PrevNextSubmitButton from "../../../common/button/PrevNextSubmitButton";
import Explanation from "../../common/answerQuestion/Explanation";

export default function ListenAndWriteWord({ questions }) {
  questions = listListeningWriteWord;

  const [curSerial, setCurSerial] = useState(1);

  const curQuestion = questions.find((q) => q.serial === curSerial);

  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);

  const onChange = (e) => {
    setUserAnswer((prevAnswers) => ({
      ...prevAnswers,
      [curQuestion.id]: e.target.value,
    }));
  };

  const handlePrevious = () => {
    if (curSerial > 1) {
      setCurSerial(curSerial - 1);
    }
  };

  const handleNext = () => {
    if (curSerial < questions.length) {
      setCurSerial(curSerial + 1);
    }
  };

  const getSubmitContent = () => {
    const total = questions.length;
    const answered = Object.keys(userAnswer || {}).length;
    return `Answered questions: ${answered} out of ${total}. Do you want to finish?`;
  };

  const getScoreContent = () => {
    let score = 0;
    const total = questions.length;
    Object.entries(userAnswer || {}).forEach(([questionId, answer]) => {
      const listening = questions.find((q) => q.id === questionId);
      if (listening) {
        if (answer === listening.question.answer) {
          score++;
        }
      }
    });
    return `Your Score: ${score}/${total}`;
  };

  const onSubmit = () => {
    setIsSubmit(true);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Listen carefully and write the word you hear
      </Typography>
      {curQuestion && (
        <>
          <SoundViewer audioSrc={curQuestion.audioSrc} />
          <Typography variant="h6" component={"p"} sx={{ marginTop: "1rem" }}>
            Question {curSerial}:{" "}
            {curQuestion.question.content.split("___").map((part, index) => (
              <span key={index}>
                {part}
                {index <
                  curQuestion.question.content.split("___").length - 1 && (
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    size="small"
                    onChange={onChange}
                    value={userAnswer?.[curQuestion.id] || ""}
                  />
                )}
              </span>
            ))}
          </Typography>
          {isShowExplain && (
            <Explanation
              explanation={curQuestion.content}
              sx={{
                marginRight: "1rem",
                backgroundColor: "#DAE995",
              }}
            />
          )}
          {isSubmit && (
            <Button
              variant="contained"
              onClick={() => setIsShowExplain(!isShowExplain)}
              sx={{
                margin: "1rem",
                width: "12rem",
                backgroundColor: "#ACCD0A",
                position: "absolute",
                bottom: "-1",
              }}
            >
              {isShowExplain ? "Hide" : "Show"} explanation
            </Button>
          )}
        </>
      )}
      <PrevNextSubmitButton
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        submitContent={getSubmitContent()}
        scoreContent={getScoreContent()}
        onSubmit={onSubmit}
      />
    </Box>
  );
}
