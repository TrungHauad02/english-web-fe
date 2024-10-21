import { Grid2, Stack } from "@mui/material";
import TopicInfo from "./TopicInfo";
import AnswerQuestionManagement from "../common/answerQuestion/AnswerQuestionManagement";
import VocabularyManagement from "./vocabulary/VocabularyManagement";
import useTopicDetail from "./useTopicDetail";
import DotLoader from "../../../../shared/component/loader/DotLoader";

export default function TopicDetail() {
  const { data, answerQuestion, fetchData } = useTopicDetail();
  if (data === null)
    return (
      <Stack
        justifyContent="center"
        alignItems={"center"}
        sx={{ height: "90vh" }}
      >
        <DotLoader />
      </Stack>
    );
  return (
    <Grid2
      container
      direction={"column"}
      spacing={2}
      sx={{ margin: "2rem 4% 2rem 4%" }}
    >
      <Stack container direction={"row"} justifyContent={"space-between"}>
        <TopicInfo data={data} />
        <Stack
          borderRadius={"0.5rem"}
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          sx={{
            maxHeight: "500px",
            width: "60%",
            overflowY: "auto",
            "&::-webkit-scrollbar": {
              width: "0.5rem",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#e0e0e0",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#555",
            },
          }}
        >
          <AnswerQuestionManagement
            data={answerQuestion}
            fetchData={fetchData}
          />
        </Stack>
      </Stack>
      <Grid2 item direction={"row"}>
        <VocabularyManagement />
      </Grid2>
    </Grid2>
  );
}
