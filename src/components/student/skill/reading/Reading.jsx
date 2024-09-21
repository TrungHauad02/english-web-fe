import MainPicture from "../../common/listTopic/MainPicture";
import ReadingContent from "./ReadingContent";
import { listQuestion } from "./ListQuestion";
import AnswerQuestion from "../../common/answerquestion/AnswerQuestion";

export default function Reading({ topic }) {
  topic = {
    title: "The Environment",
    img: "/bg_reading.png",
  };

  const reading = {
    img: "/environment.png",
    content: "/reading.md",
  };

  return (
    <>
      <MainPicture src={topic.img} title={topic.title} />
      <ReadingContent img={reading.img} content={reading.content} />
      <AnswerQuestion listQuestion={listQuestion} />
    </>
  );
}
