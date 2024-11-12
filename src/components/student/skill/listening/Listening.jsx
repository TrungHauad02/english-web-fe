import Introduction from "components/student/common/introduction/Introduction";
import MainPicture from "../../common/listTopic/MainPicture";
import PracticeListening from "./PracticeListening";
import useListening from "./useListening";

function Listening() {
  const { topic } = useListening();

  if (!topic) return <></>;
  return (
    <>
      <MainPicture src={topic.image} title={topic.title} />
      <Introduction
        title="Sharpen Your Listening Skills!"
        subtitle="Tune in to understand English in real-life contexts."
        bodyText="Listening is the key to mastering a language. In this section, you'll practice understanding different accents, tones, and conversational contexts. Focus on each exercise to improve your comprehension and connect more naturally with spoken English!"
      />

      <PracticeListening />
    </>
  );
}

export default Listening;
