import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteQuestion,
  getAnswerQuestions,
} from "api/study/answerQuestion/answerQuestionService";

export default function useAnswerQuestion(path) {
  const [localData, setLocalData] = useState(null);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [idIndex, setIdIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      if (id === "-1") {
        setLocalData([]);
        return;
      }
      const listQuestionData = await getAnswerQuestions(path, id);
      const sortedList = listQuestionData.sort((a, b) => a.serial - b.serial);
      setLocalData(sortedList);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, path]);

  const handleOpenDialog = (id, index) => {
    setIdIndex({ id, index });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIdIndex(null);
    setOpenDialog(false);
  };

  function handleAddNewQuestion() {
    if (id === "-1" || !localData) {
      setError(
        "Cannot create question. Please, create lesson first and try again"
      );
      return;
    }

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

  async function onDelQuestion() {
    const { id, index } = idIndex;
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
    fetchData,
    handleAddNewQuestion,
    onDelQuestion,
    error,
    setError,
    openDialog,
    handleOpenDialog,
    handleCloseDialog,
    isLoading,
  };
}
