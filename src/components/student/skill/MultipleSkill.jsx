import { Grid2 } from "@mui/material";
import ElementSkill from "./ElementSkill";

export default function MultipleSkill() {
  const skills = [
    {
      img: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_reading.jpg?alt=media",
      description:
        "This part will help you improve your reading skills by focusing on comprehension, speed, and vocabulary building through a variety of engaging texts.",
      name: "reading",
      path: "readings",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_listening.jpg?alt=media",
      description:
        "This part will help you improve your listening skills by offering audio exercises that will enhance your ability to understand spoken English in different contexts.",
      name: "listening",
      path: "listenings",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_speaking.jpg?alt=media",
      description:
        "This part will help you improve your speaking skills through exercises that focus on pronunciation, fluency, and clear communication.",
      name: "speaking",
      path: "speakings",
    },
    {
      img: "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_writing.png?alt=media",
      description:
        "This part will help you improve your writing skills by providing structured guidance on grammar, coherence, and creativity in your writing.",
      name: "writing",
      path: "writings",
    },
  ];

  return (
    <Grid2
      container
      direction={"column"}
      sx={{ marginX: "5%", marginY: "5%" }}
      spacing={12}
    >
      {skills.map((skill, index) => (
        <ElementSkill key={index} skill={skill} isLeft={index % 2 === 0} />
      ))}
    </Grid2>
  );
}
