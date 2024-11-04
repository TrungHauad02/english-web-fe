import MainPicture from "../../common/listTopic/MainPicture";
import ReadingContent from "./ReadingContent";
import AnswerQuestion from "../../common/answerQuestion/AnswerQuestion";
import useReading from "./useReading";
import ErrorComponent from "shared/component/error/ErrorComponent";

export default function Reading() {
  const { topic, listQuestion, error, handleCloseError } = useReading();

  if (error)
    return <ErrorComponent errorMessage={error} onClose={handleCloseError} />;

  if (!topic) return <></>;
  return (
    <>
      <MainPicture src={topic.image} title={topic.title} />
      <ReadingContent topic={topic} />
      <AnswerQuestion listQuestion={listQuestion} />
    </>
  );
}
