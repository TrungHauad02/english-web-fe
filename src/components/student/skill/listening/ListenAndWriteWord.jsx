import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import PrevNextSubmitButton from "shared/component/button/PrevNextSubmitButton";
import Explanation from "../../common/answerQuestion/Explanation";
import useListenAndWriteAWord from "./useListenAndWriteAWord";
import useColor from "shared/color/Color";

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
    setIsSubmit,
    handleReset
  } = useListenAndWriteAWord();
  const color = useColor();

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
                backgroundColor: color.Color1,
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
                backgroundColor: color.Color2_1,
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
      <Stack
        direction={"row"}
        alignItems={"flex-end"}
        justifyContent={"flex-end"}
        spacing={2}
        sx={{ marginTop: "1rem" }}
      >
        {isSubmit && (
          <Button
            variant="contained"
            sx={{ bgcolor: color.Color2_1, textTransform: "capitalize" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        )}
        <PrevNextSubmitButton
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          submitContent={getSubmitContent()}
          scoreContent={getScoreContent()}
          onSubmit={onSubmit}
        />
      </Stack>
    </Box>
  );
}
