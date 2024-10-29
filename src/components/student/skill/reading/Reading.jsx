import MainPicture from "../../common/listTopic/MainPicture";
import ReadingContent from "./ReadingContent";
import AnswerQuestion from "../../common/answerQuestion/AnswerQuestion";
import useReading from "./useReading";

export default function Reading() {
  const { topic, listQuestion } = useReading();

  if (!topic) return <></>;
  return (
    <>
      <MainPicture src={topic.image} title={topic.title} />
      <ReadingContent topic={topic} />
      <AnswerQuestion listQuestion={listQuestion} />
    </>
  );
}
