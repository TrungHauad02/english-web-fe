import MainPicture from "../../common/listTopic/MainPicture";
import Introduction from "./Introduction";
import PracticeListening from "./PracticeListening";
import useListening from "./useListening";

function Listening() {
  const { topic } = useListening();

  const content =
    "This part will help you practice your listening skill, which is very important in learning English. You will listen to a conversation and answer some questions about it. You can listen to the conversation as many times as you want. Good luck!";

  if (!topic) return <></>;
  return (
    <>
      <MainPicture src={topic.image} title={topic.title} />
      <Introduction content={content} />
      <PracticeListening />
    </>
  );
}

export default Listening;
