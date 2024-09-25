import MainPicture from "../common/listTopic/MainPicture";
import IntroductionSkill from "./IntroductionSkill";
import MultipleSkill from "./MultipleSkill";

export default function Skills() {
  const topic = {
    title: "SKILLS",
    img: "/bg_speaking.png",
  };

  return (
    <>
      <MainPicture src={topic.img} title={topic.title} />
      <IntroductionSkill />
      <MultipleSkill />
    </>
  );
}
