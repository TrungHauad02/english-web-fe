import MainPicture from "../../common/listTopic/MainPicture";
import Introduction from "./Introduction";
import PracticeWriting from "./PracticeWriting";

function Writing({ topic }) {
  topic = {
    title: "The Environment",
    img: "/bg_writing.png",
  };

  const content =
    "This part will help you practice your writing skill, which is very important in learning English. You will listen to a conversation and answer some questions about it. You can listen to the conversation as many times as you want. Good luck!";

  return (
    <>
      <MainPicture src={topic.img} title={topic.title} />
      <Introduction content={content} />
      <PracticeWriting />
    </>
  );
}

export default Writing;
