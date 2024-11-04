import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrammarDetail } from "api/study/grammar/grammarService";
import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";

export default function useGrammar() {
  const { id } = useParams();
  const [grammar, setGrammar] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);
  const [error, setError] = useState("");

  const handleCloseError = () => {
    setError("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGrammarDetail(id);
        const answerQuestionData = await getAnswerQuestions(
          "grammar",
          id,
          "ACTIVE"
        );
        setListQuestion(answerQuestionData);
        setGrammar(data);
        if (!answerQuestionData || answerQuestionData.length === 0)
          setError("This lesson doesn't available yet");
      } catch (error) {
        setError(error.response.data.details.message);
      }
    };
    fetchData();
  }, [id]);

  return {
    grammar,
    setGrammar,
    listQuestion,
    error,
    handleCloseError,
  };
}
