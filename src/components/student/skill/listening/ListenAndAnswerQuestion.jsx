import { Box } from "@mui/material";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import AnswerQuestion from "../../common/answerQuestion/AnswerQuestion";
import useListenAndAnswerQuestion from "./useListenAndAnswerQuestion";

export default function ListenAndAnswerQuestion() {
  const { listening, listQuestion } = useListenAndAnswerQuestion();
  if (!listening) return <></>;
  return (
    <Box>
      <SoundViewer audioSrc={listening.audioUrl} />
      <AnswerQuestion listQuestion={listQuestion} />
    </Box>
  );
}
