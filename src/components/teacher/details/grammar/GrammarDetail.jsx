import { Grid2 } from "@mui/material";
import GrammarInfo from "./GrammarInfo";
import AnswerQuestionManagement from "../common/answerQuestion/AnswerQuestionManagement";
import PDFViewer from "shared/component/pdfViewer/PDFViewer";
import useGrammarDetails from "./useGrammarDetails";

export default function GrammarDetail() {
  const { localData, setLocalData } = useGrammarDetails();

  const answerQuestionContainerStyle = {
    maxHeight: "500px",
    overflowY: "auto",
    borderRadius: "0.5rem",
    backgroundColor: "#FFF4CC",
    boxShadow: "0 0 0.5rem 0.1rem #00000040",
    width: "100%",
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
  if (!localData) return <></>;
  return (
    <Grid2 container direction={"row"} sx={{ margin: "2rem 4%" }} spacing={4}>
      <Grid2 item>
        {/** Grammar info*/}
        <GrammarInfo data={localData} setData={setLocalData} />
      </Grid2>
      <Grid2 container direction={"column"} spacing={4} sx={{ width: "59%" }}>
        <Grid2 item size={6} sx={answerQuestionContainerStyle}>
          <AnswerQuestionManagement path={"grammar"} />
        </Grid2>
        <Grid2 container sx={{ width: "100%" }}>
          {/* Preview File*/}
          <PDFViewer file={localData.file} title={localData.title} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
