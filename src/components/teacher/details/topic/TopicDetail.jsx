import { useParams } from "react-router-dom";
import { getTopicDetail } from "../../../../api/teacher/detailManagement";
import { Grid2 } from "@mui/material";
import TopicInfo from "./TopicInfo";
import AnswerQuestionManagement from "../common/answerQuestion/AnswerQuestionManagement";
import VocabularyManagement from "./vocabulary/VocabularyManagement";

export default function TopicDetail() {
  const { id } = useParams();
  console.log(id);
  const data = getTopicDetail(id);
  return (
    <Grid2
      container
      direction={"column"}
      spacing={2}
      sx={{ margin: "2rem 4% 2rem 4%" }}
    >
      <Grid2 container direction={"row"} justifyContent={"space-between"}>
        <Grid2 container direction={"column"}>
          <TopicInfo data={data} />
        </Grid2>
        <Grid2
          item
          borderRadius={"0.5rem"}
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          width={"60%"}
          sx={{
            maxHeight: "500px",
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
          <AnswerQuestionManagement />
        </Grid2>
      </Grid2>
      <Grid2 item direction={"row"}>
        <VocabularyManagement />
      </Grid2>
    </Grid2>
  );
}
