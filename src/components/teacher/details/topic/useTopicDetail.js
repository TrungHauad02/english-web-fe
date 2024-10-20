import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicDetail } from "../../../../api/teacher/topicService";
import { getTopicAnswerQuestions } from "../../../../api/teacher/topicAnswerQuestionService";

export default function useTopicDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [answerQuestion, setAnswerQuestion] = useState(null);
  const fetchData = async () => {
    try {
      const [dataRes, answerQuestionRes] = await Promise.all([
        getTopicDetail(id),
        getTopicAnswerQuestions(id),
      ]);
      setAnswerQuestion(answerQuestionRes);
      setData(dataRes);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    data,
    answerQuestion,
    fetchData,
  };
}
