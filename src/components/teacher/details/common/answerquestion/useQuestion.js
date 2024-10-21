import { useEffect, useState } from "react";
import {
  createTopicAnswer,
  createTopicQuestion,
  deleteTopicAnswer,
  updateTopicAnswer,
  updateTopicQuestion,
} from "../../../../../api/teacher/topicAnswerQuestionService";

export default function useQuestion(data, fetchData) {
  const [question, setQuestion] = useState(data);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setQuestion(data);
  }, [data]);

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
    try {
      setIsEditing(false);
      let newQuestion;
      if (question.id === "-1") {
        newQuestion = await createTopicQuestion(question);
      } else {
        await updateTopicQuestion(question);
        newQuestion = question;
      }
      await updateAnswer(newQuestion);
      await fetchData();
    } catch (error) {
      console.error(error);
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

  async function onDeleteAnswer(id) {
    if (!isEditing) return;
    try {
      await deleteTopicAnswer(id);
      await fetchData();
    } catch (error) {
      console.error(error);
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
