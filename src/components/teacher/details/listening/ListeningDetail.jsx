import { Grid2 } from "@mui/material";
import ListeningInfo from "./ListeningInfo";
import WriteAWordManagement from "../common/writeAWord/WriteAWordManagement";
import AnswerQuestionManagement from "../common/answerQuestion/AnswerQuestionManagement";

export default function ListeningDetail() {
  const stylesListening = {
    container: {
      margin: "2rem 4%",
    },
    scrollableSection: {
      borderRadius: "0.5rem",
      boxShadow: "0 0 0.5rem 0.1rem #00000040",
      width: "100%",
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
    },
    largerScrollableSection: {
      maxHeight: "600px",
    },
  };

  return (
    <Grid2
      container
      direction="row"
      sx={stylesListening.container}
      justifyContent="space-between"
    >
      <Grid2 item>
        <ListeningInfo />
      </Grid2>
      <Grid2 container direction="column" spacing={4}>
        <Grid2 item sx={stylesListening.scrollableSection}>
          <WriteAWordManagement />
        </Grid2>
        <Grid2
          container
          sx={{
            ...stylesListening.scrollableSection,
            ...stylesListening.largerScrollableSection,
          }}
        >
          <AnswerQuestionManagement path="listening" />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
