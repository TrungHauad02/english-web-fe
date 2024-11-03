import { Button, Card, Grid2 } from "@mui/material";
import { Stack, styled } from "@mui/system";
import ProcessBar from "./ProcessBar";
import PrevNextSubmitButton from "shared/component/button/PrevNextSubmitButton";
import ListOptions from "./ListOptions";
import Explanation from "./Explanation";
import Question from "./Question";
import useAnswerQuestion from "./useAnswerQuestion";

const Title = styled("h4")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: "1rem 0",
  color: "#000",
});

const containerStyle = {
  marginX: "5%",
  marginY: "2rem",
  padding: "1rem",
  backgroundColor: "#f1f1f1",
  position: "relative",
};

function AnswerQuestion({ listQuestion }) {
  const {
    curIndex,
    question,
    isSubmit,
    setIsSubmit,
    isShowExplain,
    setIsShowExplain,
    getUserAnswer,
    getSubmitContent,
    getScoreContent,
    handleChange,
    handleNext,
    handlePrevious,
    handleReset,
  } = useAnswerQuestion(listQuestion);
  if (!listQuestion || listQuestion.length === 0)
    return (
      <Card sx={containerStyle}>
        <Title>Answer Question</Title>
      </Card>
    );
  return (
    <Card sx={containerStyle}>
      <Title>Answer Question</Title>
      <ProcessBar
        questionNumber={curIndex + 1}
        totalQuestions={listQuestion.length}
      />
      <Grid2 container direction={"column"}>
        <Question index={curIndex + 1} content={question.content} />
        <Grid2 container direction={"row"} justifyContent={"space-between"}>
          <ListOptions
            listAnswer={question.answers}
            value={getUserAnswer(question.id)}
            sx={{ marginY: "1rem", marginX: "1rem" }}
            onChange={handleChange}
          />
          {isShowExplain && (
            <Explanation
              explanation={question.explanation}
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
              textTransform: "capitalize",
            }}
          >
            {isShowExplain ? "Hide" : "Show"} explanation
          </Button>
        )}
      </Grid2>
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
            sx={{ bgcolor: "#6EC2F7", textTransform: "capitalize" }}
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
          onSubmit={() => setIsSubmit(true)}
        />
      </Stack>
    </Card>
  );
}

export default AnswerQuestion;
