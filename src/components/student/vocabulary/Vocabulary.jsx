import MatchImageWithWord from "./MatchImageWithWord/MatchImageWithWord";
import Introduction from "./introduction/Introduction";
import ListFlashcard from "./listFlashcard/ListFlashcard";
import MainPicture from "../common/listTopic/MainPicture";
import AnswerQuestion from "../common/answerQuestion/AnswerQuestion";
import LoadingComponent from "../common/loadingPage/LoadingComponent";
import { Grid2 } from "@mui/material";
import useVocabulary from "./useVocabulary";
import ErrorComponent from "shared/component/error/ErrorComponent";

function Vocabulary() {
  const { topic, stateVocab, listQuestion, error, setError, handleCloseError } =
    useVocabulary();

  if (error) {
    return <ErrorComponent errorMessage={error} onClose={handleCloseError} />;
  }

  if (!topic)
    return (
      <Grid2
        sx={{
          marginY: "4rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid2 item>
          <LoadingComponent />
        </Grid2>
      </Grid2>
    );

  return (
    <>
      <MainPicture title={topic.title} src={topic.image} />
      <MatchImageWithWord stateVocab={stateVocab} />
      <Introduction title={topic.title} />
      <ListFlashcard topicId={topic.id} setError={setError} />
      <AnswerQuestion listQuestion={listQuestion} />
      {/**Hiển thị khi có lỗi */}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </>
  );
}

export default Vocabulary;
