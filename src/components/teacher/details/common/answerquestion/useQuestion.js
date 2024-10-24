import { useEffect, useState } from "react";
import {
  createAnswer,
  createQuestion,
  deleteAnswer,
  updateAnswer,
  updateQuestion,
} from "../../../../../api/teacher/answerQuestionService";

export default function useQuestion(data, fetchData, setError, path) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setQuestion(data);
  }, [data]);

  function handleEdit() {
    setIsEditing(true);
  }
  function handleError(err) {
    if (err.response?.data?.details) {
      const details = err.response.data.details;
      const errorMessages = Object.values(details).filter(Boolean).join(".\n");
      setError(errorMessages);
    } else {
      setError("An unexpected error occurred.");
    }
  }
  async function handleUpdateAnswer(newQuestion) {
    const updatedAnswers = question.answers.map((answer) => {
      return { ...answer, questionId: newQuestion.id };
    });

    const promises = updatedAnswers.map((answer) => {
      if (answer.id === "-1") {
        return createAnswer(path, answer);
      } else {
        return updateAnswer(path, answer);
      }
    });
    try {
      await Promise.all(promises);
    } catch (error) {
      handleError(error);
    }
  }

  async function handleSave() {
    try {
      let newQuestion;
      if (question.id === "-1") {
        newQuestion = await createQuestion(path, question);
      } else {
        await updateQuestion(path, question);
        newQuestion = question;
      }
      await handleUpdateAnswer(newQuestion);
      await fetchData();
      setIsEditing(false);
    } catch (error) {
      handleError(error);
    }
  }

  function handleAddNewAnswer() {
    if (!isEditing) return;
    const newAnswers = [
      ...question.answers,
      {
        id: "-1",
        content: "",
        correct: false,
        questionId: question.id,
        status: "ACTIVE",
      },
    ];
    setQuestion({ ...question, answers: newAnswers });
  }

  function onChangeCorrectAnswer(e) {
    if (!isEditing) return;
    const newAnswers = [...question.answers];
    newAnswers.forEach((answer) => {
      if (answer.id === e.target.value) {
        answer.correct = true;
      } else {
        answer.correct = false;
      }
    });
    setQuestion({ ...question, answers: newAnswers });
  }

  function onChangeAnswerContent(e, i) {
    if (!isEditing) return;
    const newAnswers = [...question.answers];
    newAnswers[i].content = e.target.value;
    setQuestion({ ...question, answers: newAnswers });
  }

  async function onDeleteAnswer(id) {
    if (!isEditing) return;
    try {
      await deleteAnswer(path, id);
      await fetchData();
    } catch (error) {
      handleError(error);
    }
  }

  function onChangeQuestionContent(e) {
    if (!isEditing) return;
    setQuestion({ ...question, content: e.target.value });
  }

  function onChangeQuestionSerial(e) {
    if (!isEditing) return;
    if (e.target.value < 1) return;
    setQuestion({ ...question, serial: e.target.value });
  }

  function onChangeExplanation(e) {
    if (!isEditing) return;
    setQuestion({ ...question, explanation: e.target.value });
  }

  return {
    question,
    isEditing,
    handleEdit,
    handleSave,
    handleAddNewAnswer,
    onChangeQuestionContent,
    onChangeQuestionSerial,
    onChangeExplanation,
    onChangeCorrectAnswer,
    onChangeAnswerContent,
    onDeleteAnswer,
  };
}
