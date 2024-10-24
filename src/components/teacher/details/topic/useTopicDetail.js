import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTopicDetail } from "../../../../api/teacher/topicService";
import { getAnswerQuestions } from "../../../../api/teacher/answerQuestionService";

export default function useTopicDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [answerQuestion, setAnswerQuestion] = useState(null);

  const emptyTopic = {
    id: "-1",
    serial: 1,
    title: "",
    image: "",
    description: "",
    status: "ACTIVE",
  };

  const fetchData = async () => {
    try {
      if (id === "-1") {
        setAnswerQuestion([]);
        setData(emptyTopic);
        return;
      }
      const [dataRes, answerQuestionRes] = await Promise.all([
        getTopicDetail(id),
        getAnswerQuestions("topics", id),
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
