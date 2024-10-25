import { Box } from "@mui/material";
import SoundViewer from "../../../common/soundViewer/SoundViewer";
import AnswerQuestion from "../../common/answerQuestion1/AnswerQuestion";
import { listQuestion } from "./ListQuestion";

export default function ListenAndAnswerQuestion() {
  return (
    <Box>
      <SoundViewer audioSrc="/fileListening.mp3" />
      <AnswerQuestion listQuestion={listQuestion} />
    </Box>
  );
}
