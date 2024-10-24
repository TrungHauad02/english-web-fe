import { useParams } from "react-router-dom";
import { getReadingDetail } from "../../../../api/teacher/readingService";
import { Grid2 } from "@mui/material";
import ReadingInfo from "./ReadingInfo";
import AnswerQuestionManagement from "../common/answerquestion/AnswerQuestionManagement";
import { useEffect, useState } from "react";
import MarkedViewer from "../../../common/markedViewer/MarkedViewer";

export default function ReadingDetail() {
  const { id } = useParams();
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getReadingDetail(id);
      setLocalData(data);
    };
    fetchData();
  }, [id]);

  if (!localData) return;

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
          <AnswerQuestionManagement />
        </Grid2>
        <Grid2 container sx={{ width: "100%" }}>
          {/* Preview File*/}
          <MarkedViewer path={localData.content} displayAppBar />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
