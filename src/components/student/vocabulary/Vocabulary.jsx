import MatchImageWithWord from "./MatchImageWithWord/MatchImageWithWord";
import listVocab from "./ListVocab";
import Introduction from "./introduction/Introduction";
import ListFlashcard from "./listFlashcard/ListFlashcard";
import MainPicture from "../common/listTopic/MainPicture";
import AnswerQuestion from "../common/answerquestion/AnswerQuestion";
import { listQuestion } from "./ListQuestion";

function Vocabulary({ topic }) {
  topic = {
    title: "environment",
    img: "/environment.png",
  };

  return (
    <>
      <MainPicture title={topic.title} src={topic.img} />
      <MatchImageWithWord list={listVocab} />
      <Introduction title={topic.title} />
      <ListFlashcard list={listVocab} />
      <AnswerQuestion listQuestion={listQuestion} />
    </>
  );
}

export default Vocabulary;
