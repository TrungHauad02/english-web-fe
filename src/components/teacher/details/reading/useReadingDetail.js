import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReadingDetail } from "api/study/reading/readingService";
import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";

export default function useReadingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);

  const emptyReading = {
    id: "-1",
    title: "",
    serial: 1,
    content: "",
    description: "",
    image: "",
    status: "ACTIVE",
  };

  const fetchData = async () => {
    if (id === "-1") {
      setLocalData(emptyReading);
      setListQuestion([]);
    }
    try {
      const [data, listQuestionData] = await Promise.all([
        getReadingDetail(id),
        getAnswerQuestions("reading", id),
      ]);
      setListQuestion(listQuestionData);
      setLocalData(data);
      if (!listQuestionData) setListQuestion([]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return { localData, setLocalData, listQuestion, fetchData };
}
