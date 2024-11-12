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
import {
  updateTestMixingQuestion,
} from "api/test/TestMixingQuestionApi";
import {
  createTestMixingAnswer,
  updateTestMixingAnswer,
  deleteTestMixingAnswer
} from "api/test/TestMixingAnswerApi";
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

const findCorrectAnswerId = (answers) => {
  const correctAnswer = answers.find((answer) => answer.isCorrect === true);
  return correctAnswer ? correctAnswer.id : null;
};

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: "#fff5e6",
  borderRadius: theme.spacing(2),
}));

const MixingQuiz = ({ question,handleQuestion }) => {
  return (
    <>
      <FormContainer sx={{ p: 3, bgcolor: "#fff9e6", minHeight: "100vh" }}>
        <ContentQuestion question={question} handleQuestion={handleQuestion}/>
      </FormContainer>
    </>
  );
};

const ContentQuestion = ({ question,handleQuestion }) => {


  const [questionMixing, setQuestionMixing] = useState(question);
  const [selectedAnswer, setSelectedAnswer] = useState(
    findCorrectAnswerId(question.answers)
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [answerCounter, setAnswerCounter] = useState(1);

  const handleAddAnswer = () => {
    const hasCorrectAnswer = questionMixing.answers.some((answer) => answer.isCorrect === true);
    const newAnswer = {
      id: `add_${answerCounter}`,
      content: "",
      isCorrect: !hasCorrectAnswer, 
      status: "ACTIVE",
      testQuestionMixingId: questionMixing.id,
    };

    setQuestionMixing({
      ...questionMixing,
      answers: [...questionMixing.answers, newAnswer],
    });
    setSelectedAnswer(findCorrectAnswerId([...questionMixing.answers, newAnswer]));
    setAnswerCounter(answerCounter + 1);

  };

  const handleRadioChange = (answerId) => {
    setSelectedAnswer(answerId);
    setQuestionMixing({
      ...questionMixing,
      answers: questionMixing.answers.map((a) => ({
        ...a,
        isCorrect: a.id === answerId,
      })),
    });
  };

  const handleDeleteAnswer = async (answer) => {

    const isCorrectAnswer = answer.isCorrect;
    

    const updatedAnswers = questionMixing.answers.filter((a) => a.id !== answer.id);

    if (isCorrectAnswer && updatedAnswers.length > 0) {

      updatedAnswers[0].isCorrect = true;
      setSelectedAnswer(findCorrectAnswerId(updatedAnswers))
    }

    setQuestionMixing({
      ...questionMixing,
      answers: updatedAnswers,
    });
  };

  const handleSave = async () => {
    if(question.id==='')
    {
      setIsEditMode(false);
      questionMixing.id = await AddQuestionTest(questionMixing.test.id, questionMixing.type, questionMixing);
      await Promise.all(
        questionMixing.answers.map(async (answer) => {
          answer.testQuestionMixingId = questionMixing.id;
          await createTestMixingAnswer(answer);            
        })
      );
        
        handleQuestion(questionMixing);
    }
      else
      {
        try {
      
          await updateTestMixingQuestion(questionMixing.id, questionMixing);
        

          const answersToDelete = question.answers.filter(
            (answer) =>
              !questionMixing.answers.some((newAnswer) => newAnswer.id === answer.id)
          );
          await Promise.all(
            answersToDelete.map((answer) => deleteTestMixingAnswer(answer.id))
          );
          await Promise.all(
            questionMixing.answers.map(async (answer) => {
              if (answer.id.startsWith("add")) {
                await createTestMixingAnswer(answer);
              } else {
                await updateTestMixingAnswer(answer.id, answer);
            
              }              
            })
          );


          setSelectedAnswer(findCorrectAnswerId(questionMixing.answers));
          setIsEditMode(false);
          handleQuestion(questionMixing);
        
        } catch (error) {
          console.error("Error saving question or answers:", error);
        }
        
      };
      }
   

  const handleCancel = () => {
    setIsEditMode(false);
    setQuestionMixing(question);
    setSelectedAnswer(findCorrectAnswerId(question.answers));
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setSelectedAnswer(findCorrectAnswerId(questionMixing.answers));
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">{question.type}</Typography>
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
            {question.serial}
          </Box>
          <Typography variant="h6" sx={{ mr: 1 }}>
            :
          </Typography>
          <TextField
            fullWidth
            disabled={!isEditMode}
            value={questionMixing.content || ""}
            onChange={(e) => {
              setQuestionMixing({ ...questionMixing, content: e.target.value });
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
          {questionMixing.answers.map((answer) => (
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
                value={answer.content}
                onChange={(e) => {
                  const updatedOptions = questionMixing.answers.map((opt) =>
                    opt.id === answer.id
                      ? { ...opt, content: e.target.value }
                      : opt
                  );
                  setQuestionMixing({ ...questionMixing, answers: updatedOptions });
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
                sx={{ display: isEditMode ? 'inline-flex' : 'none' }}
              >
                <Trash />
              </IconButton>
            </Box>
          ))}
        </RadioGroup>

        {question.isExplain === "false" ? null : (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Explain:
            </Typography>
            <TextField
              sx={{ width: "90%" }}
              multiline
              rows={2}
              value={questionMixing.explanation || ""}
              onChange={(e) => {
                setQuestionMixing({
                  ...questionMixing,
                  explanation: e.target.value,
                });
              }}
              disabled={!isEditMode}
            />
          </>
        )}

        <Box sx={{ display: "flex", marginTop: "1rem" }}>
          <Button
            variant="contained"
            onClick={handleAddAnswer}
            startIcon={<PlusCircle />}
            sx={{
              bgcolor: "#9dc45f",
              "&:hover": { bgcolor: "#8ab54e" },
              marginLeft: question.isExplain === "false" ? 0 : "1rem",
              whiteSpace: "nowrap",
              height: "auto",
              padding: "0.1rem 1.5rem",
              display: isEditMode ? 'inline-flex' : 'none'
            }}
  
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
            onClick={handleSave}
            disabled={!isEditMode}
          >
            Save
          </ColorButton>
        </ButtonContainer>
      </Paper>
    </>
  );
};

export default MixingQuiz;
