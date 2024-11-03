import { Grid2, Stack } from "@mui/material";
import TopicInfo from "./TopicInfo";
import AnswerQuestionManagement from "../common/answerQuestion/AnswerQuestionManagement";
import VocabularyManagement from "./vocabulary/VocabularyManagement";
import useTopicDetail from "./useTopicDetail";
import DotLoader from "../../../../shared/component/loader/DotLoader";
import ErrorComponent from "shared/component/error/ErrorComponent";

export default function TopicDetail() {
  const { data, error, setError, handleCloseError } = useTopicDetail();
  const answerQuestionContainerStyle = {
    height: "500px",
    width: "53rem",
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
  };

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
      <Grid2 container direction={"row"} justifyContent={"space-between"}>
        <Grid2 item>
          <TopicInfo data={data} setError={setError} />
        </Grid2>
        <Grid2
          borderRadius={"0.5rem"}
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          sx={answerQuestionContainerStyle}
        >
          <AnswerQuestionManagement path={"topics"} />
        </Grid2>
      </Grid2>
      <Grid2 item direction={"row"}>
        <VocabularyManagement setError={setError} />
      </Grid2>
      {/**Hiển thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </Grid2>
  );
}
