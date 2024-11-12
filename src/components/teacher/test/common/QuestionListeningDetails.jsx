import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  IconButton,
} from "@mui/material";
import { Trash, PlusCircle } from "lucide-react";
import { styled } from "@mui/material/styles";
import { updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import {
  createTestListeningAnswer,
  updateTestListeningAnswer,
  deleteTestListeningAnswer,
} from "api/test/TestListeningAnswerApi";
import { AddQuestionTest } from "../Mixing/AddQuestionTest";

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
}));

const ColorButton = styled(Button)(({ color }) => ({
  borderRadius: "8px",
  padding: "8px 24px",
  backgroundColor: color,
  color: color === "#98FB98" ? "black" : "white",
  "&:hover": {
    backgroundColor: color,
    opacity: 0.9,
  },
}));

const findCorrectAnswerId = (answers = []) => {
  const correctAnswer = answers.find((answer) => answer.isCorrect === true);
  return correctAnswer ? correctAnswer.id : null;
};


const QuestionListeningDetails = ({ question = {}, handleSaveSelectedQuestion }) => {
  return (
    <Box sx={{ p: 3, bgcolor: "#fff9e6", minHeight: "100vh" }}>
      <ContentQuestion question={question} handleSaveSelectedQuestion={handleSaveSelectedQuestion} />
    </Box>
  );
};

const ContentQuestion = ({ question = {}, handleSaveSelectedQuestion }) => {
  const [questionData, setQuestionData] = useState(question || {});
  const [backupData, setBackupData] = useState(question || {});
  const [selectedAnswer, setSelectedAnswer] = useState(
    findCorrectAnswerId(questionData.answers)
  );
  const [isEditMode, setIsEditMode] = useState(false);

  const handleAddAnswer = () => {
    const hasCorrectAnswer = questionData.answers?.some((answer) => answer.isCorrect === true);
    const newAnswer = {
      id: `add-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: "",
      isCorrect: !hasCorrectAnswer,
      status: "ACTIVE",
      testQuestionListeningId: questionData.id,
    };
    setQuestionData({
      ...questionData,
      answers: [...(questionData.answers || []), newAnswer],
    });
    setSelectedAnswer(findCorrectAnswerId([...(questionData.answers || []), newAnswer]));
  };

  const handleRadioChange = (answerId) => {
    setSelectedAnswer(answerId);
    setQuestionData({
      ...questionData,
      answers: questionData.answers?.map((a) => ({
        ...a,
        isCorrect: a.id === answerId,
      })) || [],
    });
  };

  const handleDeleteAnswer = (answer) => {
    const isCorrectAnswer = answer.isCorrect;
    const updatedAnswers = questionData.answers?.filter((a) => a.id !== answer.id) || [];

    if (isCorrectAnswer && updatedAnswers.length > 0) {
      updatedAnswers[0].isCorrect = true;
      setSelectedAnswer(findCorrectAnswerId(updatedAnswers));
    }

    setQuestionData({
      ...questionData,
      answers: updatedAnswers,
    });
  };

  const handleSave = async (questionData) => {
    
    handleSaveSelectedQuestion(questionData);
    setBackupData(questionData);
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setQuestionData(backupData || {});
    setSelectedAnswer(findCorrectAnswerId(backupData.answers));
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setSelectedAnswer(findCorrectAnswerId(backupData.answers));
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">{question?.type || ""}</Typography>
      </Box>

      <Paper sx={{ mb: 3, p: 2, boxShadow: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ mr: 1 }}>
            Serial
          </Typography>
          <Box
            sx={{
              bgcolor: "#e0e0e0",
              borderRadius: "50%",
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 1,
              padding: "0.5rem",
            }}
          >
            {question?.serial || ""}
          </Box>
          <Typography variant="h6" sx={{ mr: 1 }}>
            :
          </Typography>
          <TextField
            fullWidth
            disabled={!isEditMode}
            value={questionData.content || ""}
            onChange={(e) => {
              setQuestionData({ ...questionData, content: e.target.value });
            }}
          />
        </Box>

        <Typography variant="h6" sx={{ mb: 1 }}>
          Answers:
        </Typography>

        <RadioGroup
          value={selectedAnswer}
          onChange={(e) => handleRadioChange(e.target.value)}
        >
          {(questionData.answers || []).map((answer) => (
            <Box
              key={answer.id}
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                borderRadius: "4px",
                justifyContent: "space-between",
              }}
            >
              <TextField
                disabled={!isEditMode}
                sx={{ flexGrow: 1 }}
                value={answer.content || ""}
                onChange={(e) => {
                  const updatedOptions = (questionData.answers || []).map((opt) =>
                    opt.id === answer.id
                      ? { ...opt, content: e.target.value }
                      : opt
                  );
                  setQuestionData({ ...questionData, answers: updatedOptions });
                }}
              />
              <FormControlLabel
                control={
                  <Radio
                    disabled={!isEditMode}
                    onChange={() => handleRadioChange(answer.id)}
                  />
                }
                label=""
                value={answer.id}
                sx={{ marginLeft: "1rem" }}
              />
              <IconButton
                onClick={() => handleDeleteAnswer(answer)}
                color="error"
              >
                <Trash />
              </IconButton>
            </Box>
          ))}
        </RadioGroup>

        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          <Button
            variant="contained"
            onClick={handleAddAnswer}
            startIcon={<PlusCircle />}
            sx={{
              bgcolor: "#9dc45f",
              "&:hover": { bgcolor: "#8ab54e" },
              marginLeft: "1rem",
              whiteSpace: "nowrap",
              height: "auto",
              padding: "0.1rem 1.5rem",
            }}
            disabled={!isEditMode}
          >
            Add new answer
          </Button>
        </Box>

        <ButtonContainer>
          <ColorButton
            color="#F08080"
            variant="contained"
            onClick={handleCancel}
          >
            Cancel
          </ColorButton>
          <ColorButton color="#FFD700" variant="contained" onClick={handleEdit}>
            Edit
          </ColorButton>
          <ColorButton
            color="#98FB98"
            variant="contained"
            onClick={() => handleSave(questionData)}
            disabled={!isEditMode}
          >
            Save
          </ColorButton>
        </ButtonContainer>
      </Paper>
    </>
  );
};

export default QuestionListeningDetails;