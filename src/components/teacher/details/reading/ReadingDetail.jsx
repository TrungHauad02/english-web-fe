import { useParams } from "react-router-dom";
import { getReadingDetail } from "../../../../api/teacher/detailManagerment";
import { Grid2 } from "@mui/material";
import ReadingInfo from "./ReadingInfo";
import AnswerQuestionManagerment from "../common/answerquestion/AnswerQuestionManagerment";
import { useState } from "react";
import MarkedViewer from "../../../common/markedViewer/MarkedViewer";

export default function ReadingDetail() {
  const { id } = useParams();
  const data = getReadingDetail(id);
  const [localData, setLocalData] = useState(data);
  return (
    <Grid2
      container
      direction={"row"}
      sx={{ margin: "2rem 4%" }}
      justifyContent={"space-between"}
    >
      <Grid2 item>
        {/** Reading info*/}
        <ReadingInfo data={localData} setData={setLocalData} />
      </Grid2>
      <Grid2 container direction={"column"} spacing={2}>
        <Grid2
          item
          size={6}
          borderRadius={"0.5rem"}
          backgroundColor={"#FFF4CC"}
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          width={"100%"}
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
          <AnswerQuestionManagerment />
        </Grid2>
        <Grid2 container sx={{ width: "100%" }}>
          {/* Preview File*/}
          <MarkedViewer path={localData.file} displayAppBar />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
