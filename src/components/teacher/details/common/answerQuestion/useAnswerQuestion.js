import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteQuestion } from "api/study/answerQuestion/answerQuestionService";

export default function useAnswerQuestion(data, fetchData, path) {
  const [localData, setLocalData] = useState(data);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  function handleAddNewQuestion() {
    const newQuestion = {
      topics: {
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
            questionId: "-1",
            status: "ACTIVE",
          },
        ],
        status: "ACTIVE",
      },
      grammar: {
        id: "-1",
        serial: localData.length + 1,
        content: "",
        explanation: "",
        grammarId: id,
        answers: [
          {
            id: "-1",
            content: "",
            correct: true,
            questionId: "-1",
            status: "ACTIVE",
          },
        ],
        status: "ACTIVE",
      },
      reading: {
        id: "-1",
        serial: localData.length + 1,
        content: "",
        explanation: "",
        readingId: id,
        answers: [
          {
            id: "-1",
            content: "",
            correct: true,
            questionId: "-1",
            status: "ACTIVE",
          },
        ],
        status: "ACTIVE",
      },
    };
    setLocalData([...localData, newQuestion[path]]);
  }

  async function onDelQuestion(id, index) {
    if (id === "-1") {
      setLocalData((prevData) => prevData.filter((_, i) => i !== index));
      return;
    }
    try {
      await deleteQuestion(path, id);
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
