import { useParams } from "react-router-dom";
import { getGrammarDetail } from "../../../../api/teacher/detailManagement";
import { Grid2 } from "@mui/material";
import GrammarInfo from "./GrammarInfo";
import AnswerQuestionManagerment from "../common/answerQuestion/AnswerQuestionManagement";
import PDFViewer from "../../../common/pdfViewer/PDFViewer";
import { useState } from "react";

export default function GrammarDetail() {
  const { id } = useParams();
  const data = getGrammarDetail(id);
  const [localData, setLocalData] = useState(data);
  return (
    <Grid2 container direction={"row"} sx={{ margin: "2rem 4%" }} spacing={4}>
      <Grid2 item>
        {/** Grammar info*/}
        <GrammarInfo data={localData} setData={setLocalData} />
      </Grid2>
      <Grid2 container direction={"column"} spacing={4}>
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
          <PDFViewer file={localData.file} title={localData.title} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
