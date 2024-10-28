import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useListeningDetail() {
  const { id } = useParams();
  const [listQuestion, setListQuestion] = useState(null);

  const fetchData = async () => {
    try {
      const listQuestionData = getAnswerQuestions("listening", id);
      setListQuestion(listQuestionData);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { listQuestion, fetchData };
}
