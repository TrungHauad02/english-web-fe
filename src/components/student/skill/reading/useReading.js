import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";
import { getReadingDetail } from "api/study/reading/readingService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useReading() {
  const [topic, setTopic] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const [readingData, listQuestionData] = await Promise.all([
        getReadingDetail(id),
        getAnswerQuestions("reading", id),
      ]);
      console.log(listQuestionData);
      setTopic(readingData);
      setListQuestion(listQuestionData);
    };
    fetchData();
  }, [id]);

  return {
    topic,
    listQuestion,
  };
}
