import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import { toast } from "react-toastify";
import QuestionComponent from "./QuestionComponent";
import { styled } from "@mui/material/styles";
import { updateTestMixingQuestion } from "api/test/TestMixingQuestionApi";
import ConfirmDialog from "shared/component/confirmDialog/ConfirmDialog";
import {
  createTestMixingAnswer,
  updateTestMixingAnswer,
  deleteTestMixingAnswer,
} from "api/test/TestMixingAnswerApi";
import { AddQuestionTest } from "../Mixing/AddQuestionTest";
import useColor from "shared/color/Color";
import SaveEditCancelButton from "../common/SaveEditCancelButton"

const ButtonContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(4),
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

  if (field === "answers") {
    const emptyAnswers = value.filter(
      (answer) => !answer.content || answer.content.trim() === ""
    );

    if (emptyAnswers.length > 0) {
      errors.answers = "All answers must have content.";
    } else {
      delete errors.answers;
    }
  }

  return errors;
};

const MixingQuiz = ({ question, handleQuestion, BooleanDeleteSubmitTest ,setQuestionCurrent}) => {
  return (
    <>
      <FormContainer
        sx={{
          bgcolor: "#F0F0F0",
        }}
      >
        <ContentQuestion
          question={question}
          handleQuestion={handleQuestion}
          BooleanDeleteSubmitTest={BooleanDeleteSubmitTest}
          setQuestionCurrent ={setQuestionCurrent}
        />
      </FormContainer>
    </>
  );
};

const ContentQuestion = ({
  question,
  handleQuestion,
  BooleanDeleteSubmitTest,
  setQuestionCurrent
}) => {
  const [questionMixing, setQuestionMixing] = useState(question);
  const [selectedAnswer, setSelectedAnswer] = useState(
    findCorrectAnswerId(question.answers)
  );
  const [answersDelete, setAnswersDelete] = useState([]);
  const { Color2, Color2_1 } = useColor();
  const [isEditMode, setIsEditMode] = useState(
    question.id === "" ? true : false
  );
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    const updatedQuestion = { ...questionMixing, [field]: value };

    const updatedErrors = validateQuestion(field, value, updatedQuestion);
    setErrors(updatedErrors);

    setQuestionMixing(updatedQuestion);
  };

  const handleAnswerChange = (answerId, value) => {
    const updatedAnswers = questionMixing.answers.map((answer) =>
      answer.id === answerId ? { ...answer, content: value } : answer
    );

    const invalidAnswerIds = updatedAnswers
      .filter((answer) => !answer.content || answer.content.trim() === "")
      .map((answer) => answer.id);

    const updatedErrors = { ...errors, answers: invalidAnswerIds };

    setErrors(updatedErrors);
    setQuestionMixing({ ...questionMixing, answers: updatedAnswers });
  };

  const handleAddAnswer = () => {
    const newAnswer = {
      id: `add-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: "",
      isCorrect: false,
      status: "ACTIVE",
      testQuestionMixingId: questionMixing.id,
    };

    setQuestionMixing({
      ...questionMixing,
      answers: [...questionMixing.answers, newAnswer],
    });
  };

  const handleSelectAnswer = (answerId) => {
    const updatedAnswers = questionMixing.answers.map((answer) => ({
      ...answer,
      isCorrect: answer.id === answerId,
    }));

    setQuestionMixing({ ...questionMixing, answers: updatedAnswers });

    setSelectedAnswer(answerId);
  };

  const handleDeleteAnswer = (answer) => {
    const updatedAnswers = questionMixing.answers.filter(
      (a) => a.id !== answer.id
    );

    setQuestionMixing({
      ...questionMixing,
      answers: updatedAnswers,
    });
  };

  const handleSave = async () => {
    if (!questionMixing.content || questionMixing.content.trim() === "") {
      toast.error("Question content cannot be empty.");
      return;
    }
    if (
      !questionMixing.explanation ||
      questionMixing.explanation.trim() === ""
    ) {
      toast.error("Question explanation cannot be empty.");
      return;
    }
    const hasEmptyAnswer = questionMixing.answers.some(
      (answer) => !answer.content || answer.content.trim() === ""
    );
    if (hasEmptyAnswer) {
      toast.error("All answers must have content.");
      return;
    }

    const activeAnswers = questionMixing.answers.filter(
      (answer) => answer.status === "ACTIVE"
    );
    if (activeAnswers.length === 0) {
      toast.error("Please create least one answer ACTIVE.");
      return;
    }
    const hasCorrectAnswer = activeAnswers.some((answer) => answer.isCorrect);
    if (!hasCorrectAnswer) {
      toast.error("Please select one correct answer from ACTIVE answers.");
      return;
    }

    if (question.id === "") {
      setIsEditMode(false);
      questionMixing.id = await AddQuestionTest(
        questionMixing.test.id,
        questionMixing.type,
        questionMixing
      );
      for (const answer of questionMixing.answers) {
        answer.testQuestionMixingId = questionMixing.id;
        await createTestMixingAnswer(answer);
      }      
      toast.success(
        `Successfully created question ${question.serial} of Part ${question.type} .`
      );

      handleQuestion(questionMixing);
    } else {
      try {
        await updateTestMixingQuestion(questionMixing.id, questionMixing);

        const answersToDelete = question.answers.filter(
          (answer) =>
            !questionMixing.answers.some(
              (newAnswer) => newAnswer.id === answer.id
            )
        );
        if (answersToDelete.length > 0) {
          const result = await handleOpenDialogDelete(answersToDelete);
          if (result === "cancel") {
            handleCancel();
            return;
          }
          await Promise.all(
            answersToDelete.map(async (answer) => {
              deleteTestMixingAnswer(answer.id);
            })
          );
        }

        for (const answer of questionMixing.answers) {
          if (answer.id.startsWith("add")) {
            await createTestMixingAnswer(answer);
          } else {
            await updateTestMixingAnswer(answer.id, answer);
          }
        }
        
        setSelectedAnswer(findCorrectAnswerId(questionMixing.answers));
        setIsEditMode(false);
        toast.success(
          `Successfully updated question ${question.serial} of Part ${question.type} .`
        );
        handleQuestion(questionMixing);
      } catch (error) {
        console.error("Error saving question or answers:", error);
      }
    }
  };

  const handleCancel = () => {
    if(question.id==='')
    {
      setQuestionCurrent(null);
    }
    setIsEditMode(false);
    setQuestionMixing(question);
    setSelectedAnswer(findCorrectAnswerId(question.answers));
    setErrors({});
  };

  const handleEdit = async () => {
    const result = await BooleanDeleteSubmitTest();

    if (!result) {
      return;
    }
    setIsEditMode(true);
    setSelectedAnswer(findCorrectAnswerId(questionMixing.answers));
  };

  const [openDialogDelete, setOpenDialogDelete] = useState(false);
  const [dialogHandlers, setDialogHandlers] = useState({
    onAgree: () => {},
    onClose: () => {},
  });

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
      <Box>
        <ConfirmDialog
          open={openDialogDelete}
          onClose={dialogHandlers.onClose}
          onAgree={dialogHandlers.onAgree}
          title="Confirm Deletion"
          content={`Are you sure you want to delete ${answersDelete.length} answer(s)?`}
          cancelText="Cancel"
          agreeText="Delete"
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold" }}>{question?.type}</Typography>
        </Box>
      <Box>
      <QuestionComponent
          question={question}
          questionData={questionMixing}
          isEditMode={isEditMode}
          setQuestionData={setQuestionMixing}
          handleInputChange={handleInputChange}
          handleAnswerChange={handleAnswerChange}
          handleSelectAnswer={handleSelectAnswer}
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
        <SaveEditCancelButton
            onCancel={handleCancel}
            onEdit={handleEdit}
            onSave={handleSave}
            isEditing={isEditMode}
            size="large"
            spacing={2}
          />
        </ButtonContainer>
      </Box>
        
      </Box>
    </>
  );
};

export default MixingQuiz;
