import { Stack } from "@mui/material";
import MainPicture from "../common/MainPicture";
import GrammarInfo from "./GrammarInfo";
import GrammarDocument from "./GrammarDocument";

function Grammar({ topic }) {
  topic = {
    title: "Simple Present tense",
    img: "/environment.png",
  };

  const grammar = {
    id: 1,
    title: "Simple Present tense",
    img: "/environment.png",
    content:
      "Simple present tense is used to describe habits, unchanging situations, general truths, and fixed arrangements. It is also used with timetables, schedules, and events.",
    example: "I play football every weekend.",
    file: "/PresentContinuousTense.pdf",
  };

  return (
    <>
      <MainPicture title={topic.title} src={topic.img} />
      <GrammarInfo grammar={grammar} />
      <GrammarDocument file={grammar.file} title={grammar.title} />
    </>
  );
}

export default Grammar;
