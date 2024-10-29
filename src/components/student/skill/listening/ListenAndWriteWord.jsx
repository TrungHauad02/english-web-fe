import { Box, Button, TextField, Typography } from "@mui/material";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import PrevNextSubmitButton from "shared/component/button/PrevNextSubmitButton";
import Explanation from "../../common/answerQuestion/Explanation";
import useListenAndWriteAWord from "./useListenAndWriteAWord";

export default function ListenAndWriteWord() {
  const {
    curQuestion,
    userAnswer,
    isSubmit,
    isShowExplain,
    setIsShowExplain,
    onChange,
    handlePrevious,
    handleNext,
    getSubmitContent,
    getScoreContent,
    onSubmit,
  } = useListenAndWriteAWord();

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
        Listen carefully and write the word you hear
      </Typography>
      {curQuestion && (
        <>
          <SoundViewer audioSrc={curQuestion.audioUrl} />
          <Typography variant="h6" component={"p"} sx={{ marginTop: "1rem" }}>
            Question:{" "}
            {curQuestion.sentence.split("___").map((part, index) => (
              <span key={index}>
                {part}
                {index < curQuestion.sentence.split("___").length - 1 && (
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
              explanation={curQuestion.correctAnswer}
              sx={{
                marginRight: "1rem",
                backgroundColor: "#bee6ff",
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
                backgroundColor: "#6EC2F7",
                position: "absolute",
                bottom: "-1",
                textTransform: "capitalize",
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
