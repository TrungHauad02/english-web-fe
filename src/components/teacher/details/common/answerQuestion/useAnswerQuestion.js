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
    const createQuestionObject = (type, id) => ({
      id: "-1",
      serial: localData.length + 1,
      content: "",
      explanation: "",
      [`${type}Id`]: id,
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
    });
    const newQuestion = {
      topics: createQuestionObject("topic", id),
      grammar: createQuestionObject("grammar", id),
      reading: createQuestionObject("reading", id),
      listening: createQuestionObject("listening", id),
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
