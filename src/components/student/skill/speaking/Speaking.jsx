import Introduction from "components/student/common/introduction/Introduction";
import MainPicture from "../../common/listTopic/MainPicture";
import PracticeSpeaking from "./PracticeSpeaking";
import useSpeaking from "./useSpeaking";

function Speaking() {
  const { topic } = useSpeaking();
  if (!topic) return <></>;
  return (
    <>
      <MainPicture src={topic.image} title={topic.title} />
      <Introduction
        title="Master Your Speaking Skills!"
        subtitle="Enhance your ability to communicate in English with engaging speaking exercises."
        bodyText="Speaking fluently is one of the most important skills to master. Practice speaking with confidence, improve your pronunciation, and boost your ability to express yourself clearly in conversations."
      />

      <PracticeSpeaking />
    </>
  );
}

export default Speaking;
