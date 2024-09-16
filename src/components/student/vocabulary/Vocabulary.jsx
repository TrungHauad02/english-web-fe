import MainPicture from "../common/MainPicture";
import MatchImageWithWord from "./matchImageWithWord/MatchImageWithWord";
import listVocab from "./ListVocab";
import Introduction from "./introduction/Introduction";
import ListFlashcard from "./listFlashcard/ListFlashcard";
import AnswerQuestionVocab from "./answerquestion/AnswerQuestionVocab";

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
      <AnswerQuestionVocab />
    </>
  );
}

export default Vocabulary;
