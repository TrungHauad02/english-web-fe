import MainPicture from "../../common/listTopic/MainPicture";
import ReadingContent from "./ReadingContent";
import AnswerQuestion from "../../common/answerQuestion/AnswerQuestion";
import useReading from "./useReading";
import ErrorComponent from "shared/component/error/ErrorComponent";
import Introduction from "../../common/introduction/Introduction";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";

export default function Reading() {
  const { topic, listQuestion, error, handleCloseError } = useReading();

  if (error)
    return <ErrorComponent errorMessage={error} onClose={handleCloseError} />;

  if (!topic) return <></>;
  return (
    <>
      <MainPicture src={topic.image} title={topic.title} />
      <ReadingContent topic={topic} />
      <Introduction
        title="Enhance Your Reading Skills!"
        subtitle="Explore interesting texts and improve your ability to understand and analyze English readings."
        bodyText="Reading is the key to expanding your vocabulary, enhancing comprehension, and improving overall language proficiency. Engage with the text, reflect on key ideas, and check your understanding through questions!"
      />

      <CollapsibleSection buttonText="Answer Questions">
        <AnswerQuestion listQuestion={listQuestion} />
      </CollapsibleSection>
    </>
  );
}
