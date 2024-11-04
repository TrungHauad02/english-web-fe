import MainPicture from "../common/listTopic/MainPicture";
import GrammarInfo from "./GrammarInfo";
import GrammarDocument from "./GrammarDocument";
import AnswerQuestion from "../common/answerQuestion/AnswerQuestion";
import useGrammar from "./useGrammar";
import ErrorComponent from "shared/component/error/ErrorComponent";

function Grammar() {
  const { grammar, listQuestion, error, handleCloseError } = useGrammar();
  if (!grammar) return <></>;
  return (
    <>
      <MainPicture title={grammar.title} src={grammar.image} />
      <GrammarInfo grammar={grammar} />
      <GrammarDocument file={grammar.file} title={grammar.title} />
      <AnswerQuestion listQuestion={listQuestion} />
      {/* Hiện thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </>
  );
}

export default Grammar;
