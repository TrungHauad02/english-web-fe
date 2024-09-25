import { Grid2 } from "@mui/material";
import ElementSkill from "./ElementSkill";

export default function MultipleSkill() {
  const skills = [
    {
      img: "/bg_reading.png",
      description:
        "This part will help you improve your reading skills by focusing on comprehension, speed, and vocabulary building through a variety of engaging texts.",
      name: "reading",
      path: "reading",
    },
    {
      img: "/bg_listening.png",
      description:
        "This part will help you improve your listening skills by offering audio exercises that will enhance your ability to understand spoken English in different contexts.",
      name: "listening",
      path: "listening",
    },
    {
      img: "/bg_speaking.png",
      description:
        "This part will help you improve your speaking skills through exercises that focus on pronunciation, fluency, and clear communication.",
      name: "speaking",
      path: "speaking",
    },
    {
      img: "/bg_writing.png",
      description:
        "This part will help you improve your writing skills by providing structured guidance on grammar, coherence, and creativity in your writing.",
      name: "writing",
      path: "writing",
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
