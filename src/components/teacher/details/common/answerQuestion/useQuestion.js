import { useEffect, useState } from "react";
import {
  createAnswer,
  createQuestion,
  deleteAnswer,
  updateAnswer,
  updateQuestion,
} from "api/study/answerQuestion/answerQuestionService";
import handleError from "shared/utils/handleError";

export default function useQuestion(data, fetchData, setError, path) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setQuestion(data);
  }, [data]);

  function handleEdit() {
    setIsEditing(true);
  }

  async function handleUpdateAnswer(newQuestion) {
    const updatedAnswers = question.answers.map((answer) => {
      return { ...answer, questionId: newQuestion.id };
    });

    const promises = updatedAnswers.map((answer) => {
      if (answer.id === "-1") {
        return createAnswer(path, answer);
      } else {
        return updateAnswer(path, answer.id, answer);
      }
    });
    try {
      await Promise.all(promises);
    } catch (err) {
      handleError(err, setError);
    }
  }

  async function handleSave() {
    try {
      if (!isEditing) return;
      let newQuestion;
      if (question.id === "-1") {
        newQuestion = await createQuestion(path, question);
      } else {
        await updateQuestion(path, question.id, question);
        newQuestion = question;
      }
      await handleUpdateAnswer(newQuestion);
      await fetchData();
      setIsEditing(false);
    } catch (error) {
      if (typeof error.response?.data?.details === "string") {
        setError(error.response.data.details);
        return;
      }
      handleError(error, setError);
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

  async function onDeleteAnswer(id, index) {
    if (!isEditing) return;
    if (id === "-1") {
      setQuestion((prevData) => ({
        ...prevData,
        answers: prevData.answers.filter((_, i) => i !== index),
      }));
      return;
    }
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

  function onChangeStatus(e) {
    if (!isEditing) return;
    setQuestion({ ...question, status: e.target.value });
  }

  function onChangeAnswerStatus(e, i) {
    if (!isEditing) return;
    const newAnswers = [...question.answers];
    newAnswers[i].status = e.target.value;
    setQuestion({ ...question, answers: newAnswers });
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
    onChangeAnswerStatus,
    onChangeStatus,
    onDeleteAnswer,
  };
}
