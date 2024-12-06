import React, { useState } from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import useColor from "shared/color/Color";
import QuestionComponent from "./QuestionComponent";
import { toast } from "react-toastify";
import { styled } from "@mui/material/styles";

import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";

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

const validateQuestion = (field, value, question) => {
  const errors = { ...question.errors };

  if (field === "content") {
    if (!value || value.trim() === "") {
      errors.content = "Question content cannot be empty.";
    } else {
      delete errors.content;
    }
  }

  if (field === "explanation") {
    if (!value || value.trim() === "") {
      errors.explanation = "Explanation cannot be empty.";
    } else {
      delete errors.explanation;
    }
  }

  return errors;
};

const QuestionReadingDetails = ({
  question = {},
  handleSaveSelectedQuestion,
  isEditTestParent,
}) => {
  return (
    <Box sx={{ bgcolor: "", minHeight: "100vh" }}>
      <ContentQuestion
        question={question}
        handleSaveSelectedQuestion={handleSaveSelectedQuestion}
        isEditTestParent={isEditTestParent}
      />
    </Box>
  );
};

const ContentQuestion = ({
  question = {},
  handleSaveSelectedQuestion,
  isEditTestParent,
}) => {
  const { Color2, Color2_1 } = useColor();
  const [questionData, setQuestionData] = useState(question || {});
  const [backupData, setBackupData] = useState(question || {});
  const [selectedAnswer, setSelectedAnswer] = useState(
    findCorrectAnswerId(questionData.answers)
  );
  const [isEditMode, setIsEditMode] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const updatedQuestion = { ...questionData, [field]: value };

    const updatedErrors = validateQuestion(field, value, updatedQuestion);
    setErrors(updatedErrors);

    setQuestionData(updatedQuestion);
  };

  const handleAddAnswer = () => {
    const hasCorrectAnswer = questionData.answers?.some(
      (answer) => answer.isCorrect === true
    );
    const newAnswer = {
      id: `add-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: "",
      isCorrect: !hasCorrectAnswer,
      status: "ACTIVE",
      testQuestionReadingId: questionData.id,
    };
    setQuestionData({
      ...questionData,
      answers: [...(questionData.answers || []), newAnswer],
    });
    setSelectedAnswer(
      findCorrectAnswerId([...(questionData.answers || []), newAnswer])
    );
  };

  const handleRadioChange = (answerId) => {
    setSelectedAnswer(answerId);
    setQuestionData({
      ...questionData,
      answers:
        questionData.answers?.map((a) => ({
          ...a,
          isCorrect: a.id === answerId,
        })) || [],
    });
  };

  const handleDeleteAnswer = (answer) => {
    const updatedAnswers =
      questionData.answers?.filter((a) => a.id !== answer.id) || [];
    setQuestionData({
      ...questionData,
      answers: updatedAnswers,
    });
  };
  const handleAnswerChange = (answerId, value) => {
    const updatedAnswers = questionData.answers.map((answer) =>
      answer.id === answerId ? { ...answer, content: value } : answer
    );

    const invalidAnswerIds = updatedAnswers
      .filter((answer) => !answer.content || answer.content.trim() === "")
      .map((answer) => answer.id);

    const updatedErrors = { ...errors, answers: invalidAnswerIds };

    setErrors(updatedErrors);
    setQuestionData({ ...questionData, answers: updatedAnswers });
  };

  const handleSave = async () => {
    if (!questionData.content || questionData.content.trim() === "") {
      toast.error("Question content cannot be empty.");
      return;
    }

    if (!questionData.explanation || questionData.explanation.trim() === "") {
      toast.error("Explanation cannot be empty.");
      return;
    }

    const hasEmptyAnswer = questionData.answers?.some(
      (answer) => !answer.content || answer.content.trim() === ""
    );
    if (hasEmptyAnswer) {
      toast.error("All answers must have content.");
      return;
    }

    const activeAnswers = questionData.answers?.filter(
      (answer) => answer.status === "ACTIVE"
    );
    if (activeAnswers.length === 0) {
      toast.error("Please create least one answer ACTIVE.");
      return;
    }
    const hasCorrectAnswer = activeAnswers?.some((answer) => answer.isCorrect);
    if (!hasCorrectAnswer) {
      toast.error("Please select one correct answer active.");
      return;
    }

    const answersToDelete = question.answers.filter(
      (answer) =>
        !questionData.answers.some((newAnswer) => newAnswer.id === answer.id)
    );
    if (answersToDelete.length > 0) {
      const result = await handleOpenDialogDelete(answersToDelete);
      if (result === "cancel") {
        handleCancel();
        return;
      }
    }

    setSelectedAnswer(findCorrectAnswerId(questionData.answers));
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
  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dialogHandlers, setDialogHandlers] = useState({
    onAgree: () => {},
    onClose: () => {},
  });

  const [answersDelete, setAnswersDelete] = useState([]);
  const handleOpenDialogDelete = (answersToDelete) => {
    setAnswersDelete(answersToDelete);
    return new Promise((resolve) => {
      setOpenDialogDelete(true);

      const handleSave = () => {
        setOpenDialogDelete(false);
        resolve("save");
      };

      const handleCancel = () => {
        setOpenDialogDelete(false);
        resolve("cancel");
      };

      setDialogHandlers({ onAgree: handleSave, onClose: handleCancel });
    });
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Typography variant="h4">{question?.type || ""}</Typography>
      </Box>
      <ConfirmDialog
        open={openDialogDelete}
        onClose={dialogHandlers.onClose}
        onAgree={dialogHandlers.onAgree}
        title="Confirm Deletion"
        content={`Are you sure you want to delete ${answersDelete.length} answer(s)?`}
        cancelText="Cancel"
        agreeText="Delete"
      />

      <Paper sx={{ mb: 3, p: 2, boxShadow: 3, backgroundColor: "#F0F0F0" }}>
        <QuestionComponent
          question={question}
          questionData={questionData}
          isEditMode={isEditMode}
          setQuestionData={setQuestionData}
          handleInputChange={handleInputChange}
          handleAnswerChange={handleAnswerChange}
          handleSelectAnswer={handleRadioChange}
          handleAddAnswer={handleAddAnswer}
          handleDeleteAnswer={handleDeleteAnswer}
          errors={errors}
          setSelectedAnswer={setSelectedAnswer}
          selectedAnswer={selectedAnswer}
          handleSave={handleSave}
          handleEdit={handleEdit}
          handleCancel={handleCancel}
          Color2={Color2}
          Color2_1={Color2_1}
        ></QuestionComponent>

        <ButtonContainer>
          <ColorButton
            color="#F08080"
            variant="contained"
            disabled={isEditTestParent}
            onClick={handleCancel}
          >
            Cancel
          </ColorButton>
          <ColorButton
            color="#FFD700"
            variant="contained"
            onClick={handleEdit}
            disabled={isEditTestParent || isEditMode}
          >
            Edit
          </ColorButton>
          <ColorButton
            color="#00796B"
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

export default QuestionReadingDetails;
