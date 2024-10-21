import { Stack, Typography } from "@mui/material";
import TopicList from "./TopicList";

export default function ListTopicManagement({ title }) {
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
        {title} Management
      </Typography>
      <TopicList title={title} />
    </Stack>
  );
}
