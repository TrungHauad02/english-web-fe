import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getGrammarDetail } from "api/study/grammar/grammarService";
import { getAnswerQuestions } from "api/study/answerQuestion/answerQuestionService";

export default function useGrammar() {
  const { id } = useParams();
  const [grammar, setGrammar] = useState(null);
  const [listQuestion, setListQuestion] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGrammarDetail(id);
        const answerQuestionData = await getAnswerQuestions("grammar", id);
        setListQuestion(answerQuestionData);
        setGrammar(data);
      } catch (error) {}
    };
    fetchData();
  }, [id]);

  return {
    grammar,
    setGrammar,
    listQuestion,
  };
}
