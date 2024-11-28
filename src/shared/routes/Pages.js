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
    bg: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_vocabulary.png?alt=media",
    path: "topics",
    file: ListTopic,
    detail: Vocabulary,
  },
  {
    id: 2,
    title: "Grammar",
    bg: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_grammar.png?alt=media",
    path: "grammars",
    file: ListTopic,
    detail: Grammar,
  },
  {
    id: 3,
    title: "Reading",
    bg: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_reading.jpg?alt=media",
    path: "readings",
    file: ListTopic,
    detail: Reading,
  },
  {
    id: 4,
    title: "Listening",
    bg: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_listening.jpg?alt=media",
    path: "listenings",
    file: ListTopic,
    detail: Listening,
  },
  {
    id: 5,
    title: "Speaking",
    bg: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_speaking.jpg?alt=media",
    path: "speakings",
    file: ListTopic,
    detail: Speaking,
  },
  {
    id: 6,
    title: "Writing",
    bg: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_writing.png?alt=media",
    path: "writings",
    file: ListTopic,
    detail: Writing,
  },
];

export default site;
