import { useState } from "react";
import {
  createTopicAnswer,
  createTopicQuestion,
  updateTopicAnswer,
  updateTopicQuestion,
} from "../../../../../api/teacher/topicAnswerQuestionService";

export default function useQuestion(data, fetchData) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit() {
    setIsEditing(true);
  }

  async function updateAnswer(newQuestion) {
    const updatedAnswers = question.answers.map((answer) => {
      return { ...answer, topicQuestionId: newQuestion.id };
    });

    const promises = updatedAnswers.map((answer) => {
      if (answer.id === "-1") {
        return createTopicAnswer(answer);
      } else {
        return updateTopicAnswer(answer);
      }
    });
    await Promise.all(promises);
  }

  async function handleSave() {
    setIsEditing(false);
    if (question.id === "-1") {
      const newQuestion = await createTopicQuestion(question);
      setQuestion(newQuestion);
      await updateAnswer(newQuestion);
    } else {
      await updateTopicQuestion(question);
      await updateAnswer(question);
    }
    fetchData();
  }

  function handleAddNewAnswer() {
    if (!isEditing) return;
    const newAnswers = [
      ...question.answers,
      {
        id: "-1",
        content: "",
        correct: false,
        topicQuestionId: question.id,
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

  function onChangeAnswerContent(e, id) {
    if (!isEditing) return;
    const newAnswers = [...question.answers];
    newAnswers.forEach((answer) => {
      if (answer.id === id) {
        answer.content = e.target.value;
      }
    });
    setQuestion({ ...question, answers: newAnswers });
  }

  function onDeleteAnswer(id) {
    if (!isEditing) return;
    const newAnswers = question.answers.filter((answer) => answer.id !== id);
    setQuestion({ ...question, answers: newAnswers });
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
