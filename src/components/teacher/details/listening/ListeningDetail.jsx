import { useParams } from "react-router-dom";
import { getListeningDetail } from "../../../../api/teacher/listeningService";
import { Grid2 } from "@mui/material";
import ListeningInfo from "./ListeningInfo";
import WriteAWordManagement from "../common/writeaword/WriteAWordManagement";
import AnswerQuestionManagement from "../common/answerquestion/AnswerQuestionManagement";
import { useState } from "react";

export default function ListeningDetail() {
  const { id } = useParams();
  const data = getListeningDetail(id);
  const [localData, setLocalData] = useState(data);
  const [file, setFile] = useState("/fileListening.mp3");

  function onChangeFile(e) {
    const file = e.target.files[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      setFile(audioUrl);
    }
  }

  return (
    <Grid2
      container
      direction={"row"}
      sx={{ margin: "2rem 4%" }}
      justifyContent={"space-between"}
    >
      <Grid2 item>
        {/** Listening info*/}
        <ListeningInfo data={localData} setData={setLocalData} />
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
          <WriteAWordManagement />
        </Grid2>
        <Grid2
          container
          borderRadius={"0.5rem"}
          backgroundColor={"#FFF4CC"}
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          width={"100%"}
          sx={{
            maxHeight: "600px",
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
            isListening
            file={file}
            onChangeFile={onChangeFile}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
