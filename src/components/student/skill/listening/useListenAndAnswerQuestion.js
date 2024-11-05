import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";
import { getListeningDetail } from "api/study/listening/listeningService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useListenAndAnswerQuestion() {
  const [listening, setListening] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [data, listQuestionData] = await Promise.all([
        getListeningDetail(id),
        getAnswerQuestions("listening", id, "ACTIVE"),
      ]);
      setListening(data);
      setListQuestion(listQuestionData);
    };
    fetchData();
  }, [id]);

  return {
    listening,
    listQuestion,
  };
}
