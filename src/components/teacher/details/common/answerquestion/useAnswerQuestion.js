import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteTopicQuestion } from "../../../../../api/teacher/topicAnswerQuestionService";

export default function useAnswerQuestion(data, fetchData) {
  const [localData, setLocalData] = useState(data);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  function handleAddNewQuestion() {
    const newQuestion = {
      id: "-1",
      serial: localData.length + 1,
      content: "",
      explanation: "",
      topicId: id,
      answers: [
        {
          id: "-1",
          content: "",
          correct: true,
          topicQuestionId: "-1",
          status: "ACTIVE",
        },
      ],
      status: "ACTIVE",
    };
    setLocalData([...localData, newQuestion]);
  }

  async function onDelQuestion(id) {
    try {
      await deleteTopicQuestion(id);
      await fetchData();
    } catch (error) {
      setError(error.response.data.message);
    }
  }

  return {
    localData,
    handleAddNewQuestion,
    onDelQuestion,
    error,
    setError,
  };
}
