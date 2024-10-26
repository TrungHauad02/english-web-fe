import MainPicture from "../common/listTopic/MainPicture";
import GrammarInfo from "./GrammarInfo";
import GrammarDocument from "./GrammarDocument";
import AnswerQuestion from "../common/answerQuestion/AnswerQuestion";
import useGrammar from "./useGrammar";

function Grammar() {
  const { grammar, listQuestion } = useGrammar();
  if (!grammar) return <></>;
  return (
    <>
      <MainPicture title={grammar.title} src={grammar.image} />
      <GrammarInfo grammar={grammar} />
      <GrammarDocument file={grammar.file} title={grammar.title} />
      <AnswerQuestion listQuestion={listQuestion} />
    </>
  );
}

export default Grammar;
