import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";
import { getReadingDetail } from "api/study/reading/readingService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function useReading() {
  const [topic, setTopic] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleCloseError = () => {
    setError("");
    navigate(`/student/readings`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [readingData, listQuestionData] = await Promise.all([
          getReadingDetail(id),
          getAnswerQuestions("reading", id, "ACTIVE"),
        ]);
        setTopic(readingData);
        setListQuestion(listQuestionData);
        if (!listQuestionData || listQuestionData.length === 0)
          setError("This lesson doesn't available yet");
      } catch (error) {
        setError(error.response.data.message);
      }
    };
    fetchData();
  }, [id]);

  return {
    topic,
    listQuestion,
    error,
    handleCloseError,
  };
}
