import { Stack, Typography } from "@mui/material";
import { getListTopic } from "../../../api/teacher/listTopicManagerment";
import TopicList from "./TopicList";

export default function ListTopicManagerment({ title }) {
  const listTopic = getListTopic(title);
  return (
    <Stack
      direction={"column"}
      spacing={6}
      sx={{ marginX: "5%", marginY: "2rem" }}
    >
      <Typography
        variant={"h4"}
        textTransform={"capitalize"}
        fontWeight={"bold"}
      >
        {title} Managerment
      </Typography>
      <TopicList listTopic={listTopic} title={title} />
    </Stack>
  );
}
