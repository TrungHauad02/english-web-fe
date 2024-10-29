import { getWriteAWordByListeningId } from "api/study/listening/writeAWordService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useListenAndWriteAWord() {
  const [listQuestion, setListQuestion] = useState(null);
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [isShowExplain, setIsShowExplain] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getWriteAWordByListeningId(id);
      setListQuestion(data);
      setCurQuestionIndex(0);
    };

    fetchData();
  }, [id]);

  const curQuestion = listQuestion ? listQuestion[curQuestionIndex] : null;
  const onChange = (e) => {
    setUserAnswer((prevAnswers) => ({
      ...prevAnswers,
      [curQuestion.id]: e.target.value,
    }));
  };

  const handlePrevious = () => {
    if (curQuestionIndex > 0) {
      setCurQuestionIndex(curQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    if (curQuestionIndex < listQuestion.length - 1) {
      setCurQuestionIndex(curQuestionIndex + 1);
    }
  };

  const getSubmitContent = () => {
    if (!listQuestion) return "Loading...";
    const total = listQuestion.length;
    const answered = Object.keys(userAnswer || {}).length;
    return `Answered questions: ${answered} out of ${total}. Do you want to finish?`;
  };

  const getScoreContent = () => {
    if (!listQuestion) return "Loading...";
    let score = 0;
    const total = listQuestion.length;
    Object.entries(userAnswer || {}).forEach(([questionId, answer]) => {
      const question = listQuestion.find((q) => q.id === questionId);
      if (question && answer === question.correctAnswer) {
        score++;
      }
    });
    return `Your Score: ${score}/${total}`;
  };

  const onSubmit = () => {
    setIsSubmit(true);
  };

  return {
    listQuestion,
    curQuestion,
    curQuestionIndex,
    userAnswer,
    isSubmit,
    isShowExplain,
    setIsShowExplain,
    onChange,
    handlePrevious,
    handleNext,
    getSubmitContent,
    getScoreContent,
    onSubmit,
  };
}
