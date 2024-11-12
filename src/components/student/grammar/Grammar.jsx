import MainPicture from "../common/listTopic/MainPicture";
import GrammarInfo from "./GrammarInfo";
import GrammarDocument from "./GrammarDocument";
import AnswerQuestion from "../common/answerQuestion/AnswerQuestion";
import useGrammar from "./useGrammar";
import ErrorComponent from "shared/component/error/ErrorComponent";
import Introduction from "../common/introduction/Introduction";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";

function Grammar() {
  const { grammar, listQuestion, error, handleCloseError } = useGrammar();

  if (!grammar) return <></>;

  return (
    <>
      <MainPicture title={grammar.title} src={grammar.image} />
      <GrammarInfo grammar={grammar} />

      <Introduction
        title="Master the Grammar Rules!"
        subtitle="Learn how grammar structures form the foundation of English and improve your language skills."
        bodyText="Understanding grammar will help you construct clear and correct sentences. Practice through exercises, review key points, and enhance your language fluency!"
      />
      
      <CollapsibleSection buttonText={`${grammar.title} document`}>
        <GrammarDocument file={grammar.file} title={grammar.title} />
      </CollapsibleSection>

      <CollapsibleSection buttonText="Answer Questions">
        <AnswerQuestion listQuestion={listQuestion} />
      </CollapsibleSection>

      {/* Hiện thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </>
  );
}

export default Grammar;
