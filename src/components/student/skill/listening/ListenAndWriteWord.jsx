import { Box, TextField, Typography } from "@mui/material";
import SoundViewer from "../../../common/soundViewer/SoundViewer";
import { useState } from "react";
import { listListeningWriteWord } from "./listListening";
import PrevNextSubmitButton from "../../../common/button/PrevNextSubmitButton";

export default function ListenAndWriteWord({ questions }) {
  questions = listListeningWriteWord;

  const [curSerial, setCurSerial] = useState(1);

  const curQuestion = questions.find((q) => q.serial === curSerial);

  const [userAnswer, setUserAnswer] = useState(null);

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

  const onSubmit = () => {};

  return (
    <Box>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Listen carefully and write the word you hear
      </Typography>
      {curQuestion && (
        <>
          <SoundViewer audioSrc={curQuestion.audioSrc} />
          <Typography variant="h6" component={"p"} sx={{ marginTop: "1rem" }}>
            Question {curSerial}:{" "}
            {curQuestion.question.content.split("$$$").map((part, index) => (
              <span key={index}>
                {part}
                {index <
                  curQuestion.question.content.split("$$$").length - 1 && (
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
        </>
      )}
      <PrevNextSubmitButton
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        submitConent={getSubmitContent()}
        scoreContent={getScoreContent()}
        onSubmit={onSubmit}
      />
    </Box>
  );
}
