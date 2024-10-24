import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrammarDetail } from "../../../../api/teacher/grammarService";
import { getAnswerQuestions } from "../../../../api/teacher/answerQuestionService";

export default function useGrammarDetails() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);
  const [answerQuestion, setAnswerQuestion] = useState(null);
  const fetchData = async () => {
    const [grammarData, answerQuestionData] = await Promise.all([
      getGrammarDetail(id),
      getAnswerQuestions("grammar", id),
    ]);
    console.log(grammarData);
    console.log(answerQuestionData);
    setLocalData(grammarData);
    setAnswerQuestion(answerQuestionData);
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
