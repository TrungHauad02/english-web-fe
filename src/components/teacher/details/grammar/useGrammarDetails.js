import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrammarDetail } from "../../../../api/teacher/grammarService";
import { getAnswerQuestions } from "../../../../api/teacher/answerQuestionService";

export default function useGrammarDetails() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);
  const [answerQuestion, setAnswerQuestion] = useState(null);

  const emptyGrammar = {
    id: "-1",
    title: "",
    serial: 1,
    content: "",
    description: "",
    image: "",
    example: "",
    file: "",
    status: "ACTIVE",
  };

  const fetchData = async () => {
    if (id === "-1") {
      setAnswerQuestion([]);
      setLocalData(emptyGrammar);
      return;
    }
    const [grammarData, answerQuestionData] = await Promise.all([
      getGrammarDetail(id),
      getAnswerQuestions("grammar", id),
    ]);
    setLocalData(grammarData);
    setAnswerQuestion(answerQuestionData);
    if (!answerQuestionData) setAnswerQuestion([]);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return {
    localData,
    setLocalData,
    answerQuestion,
    fetchData,
  };
}
