import Introduction from "components/student/common/introduction/Introduction";
import MainPicture from "../../common/listTopic/MainPicture";
import useWriting from "./useWriting";
import WritingAboutTopic from "./WritingAboutTopic";
import { Stack } from "@mui/material";

function Writing() {
  const {topic} = useWriting();

  if (!topic) return <></>;

  return (
    <>
      <MainPicture src={topic.img} title={topic.title} />
      <Introduction
        title="Unlock Your Writing Potential!"
        subtitle="Master the art of expressing ideas clearly and effectively in English."
        bodyText="Writing is a powerful tool for communication. In this section, you'll learn to organize your thoughts, use correct grammar, and express your ideas in a way that resonates. Take each step to develop a structured and impactful writing style!"
      />
      <Stack sx={{ margin: "1rem 2%", padding: "1rem 2%", backgroundColor: "#f1f1f1", borderRadius: "0.5rem" }}>
        <WritingAboutTopic writing={topic} />
      </Stack>
    </>
  );
}

export default Writing;
