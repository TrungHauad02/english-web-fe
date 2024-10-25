import { useState } from "react";

export default function useAnswerQuestion(listQuestion) {
  const [curIndex, setCurIndex] = useState(0);
  const question = listQuestion[curIndex];
  const [userAnswer, setUserAnswer] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);

  const handleChange = (e) => {
    const answer = {
      questionId: question.id,
      answerId: e.target.value,
    };

    setUserAnswer((prevAnswers) => ({
      ...prevAnswers,
      [question.id]: answer.answerId,
    }));
  };

  const getUserAnswer = (questionId) => {
    if (!userAnswer) return null;
    return userAnswer[questionId] || null;
  };

  const handlePrevious = () => {
    if (curIndex === 0) return;
    setCurIndex((prevIndex) => prevIndex - 1);
  };
  const handleNext = () => {
    if (curIndex === listQuestion.length - 1) return;
    setCurIndex((prevIndex) => prevIndex + 1);
  };

  const getSubmitContent = () => {
    const total = listQuestion.length;
    const answered = Object.keys(userAnswer || {}).length;
    return `Answered questions: ${answered} out of ${total}. Do you want to finish?`;
  };

  const getScoreContent = () => {
    let score = 0;
    const total = listQuestion.length;
    Object.entries(userAnswer || {}).forEach(([questionId, answerId]) => {
      const question = listQuestion.find((q) => q.id === questionId);
      if (question) {
        const selectedOption = question.answers.find((o) => o.id === answerId);
        if (selectedOption && selectedOption.correct) {
          score++;
        }
      }
    });

    return `Your Score: ${score}/${total}`;
  };

  return {
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
  };
}
