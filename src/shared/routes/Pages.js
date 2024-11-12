import Vocabulary from "components/student/vocabulary/Vocabulary";
import Grammar from "components/student/grammar/Grammar";
import Reading from "components/student/skill/reading/Reading";
import Listening from "components/student/skill/listening/Listening";
import Speaking from "components/student/skill/speaking/Speaking";
import Writing from "components/student/skill/writing/Writing";
import ListTopic from "components/student/common/listTopic/ListTopic";

const site = [
  {
    id: 1,
    title: "Vocabulary",
    bg: "/bg_vocabulary.png",
    path: "topics",
    file: ListTopic,
    detail: Vocabulary,
  },
  {
    id: 2,
    title: "Grammar",
    bg: "/bg_grammar.png",
    path: "grammars",
    file: ListTopic,
    detail: Grammar,
  },
  {
    id: 3,
    title: "Reading",
    bg: "/bg_reading.png",
    path: "readings",
    file: ListTopic,
    detail: Reading,
  },
  {
    id: 4,
    title: "Listening",
    bg: "/bg_listening.png",
    path: "listenings",
    file: ListTopic,
    detail: Listening,
  },
  {
    id: 5,
    title: "Speaking",
    bg: "/bg_speaking.png",
    path: "speakings",
    file: ListTopic,
    detail: Speaking,
  },
  {
    id: 6,
    title: "Writing",
    bg: "/bg_writing.png",
    path: "writings",
    file: ListTopic,
    detail: Writing,
  },
];

export default site;
