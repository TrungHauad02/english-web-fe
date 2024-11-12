import MatchImageWithWord from "./MatchImageWithWord/MatchImageWithWord";
import Introduction from "../common/introduction/Introduction";
import ListFlashcard from "./listFlashcard/ListFlashcard";
import MainPicture from "../common/listTopic/MainPicture";
import AnswerQuestion from "../common/answerQuestion/AnswerQuestion";
import LoadingComponent from "../common/loadingPage/LoadingComponent";
import { Grid } from "@mui/material";
import useVocabulary from "./useVocabulary";
import ErrorComponent from "shared/component/error/ErrorComponent";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";  // Import CollapsibleSection

function Vocabulary() {
  const { topic, stateVocab, listQuestion, error, setError, handleCloseError } = useVocabulary();

  if (error) {
    return <ErrorComponent errorMessage={error} onClose={handleCloseError} />;
  }

  if (!topic)
    return (
      <Grid
        sx={{
          marginY: "4rem",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid item>
          <LoadingComponent />
        </Grid>
      </Grid>
    );

  return (
    <>
      <MainPicture title={topic.title} src={topic.image} />

      <CollapsibleSection buttonText="Image And Word">
        <MatchImageWithWord stateVocab={stateVocab} />
      </CollapsibleSection>

      <Introduction 
        title="Welcome to the Vocabulary Adventure!" 
        subtitle="Dive into new words and expressions that will help you explore and understand English in depth."
        bodyText="Each word is a step closer to mastering this topic. Take your time, review the flashcards, and see how your understanding grows!"
      />

      <CollapsibleSection buttonText="Flashcards">
        <ListFlashcard topicId={topic.id} setError={setError} />
      </CollapsibleSection>

      <CollapsibleSection buttonText="Answer Questions">
        <AnswerQuestion listQuestion={listQuestion} />
      </CollapsibleSection>

      {error && <ErrorComponent errorMessage={error} onClose={handleCloseError} />}
    </>
  );
}

export default Vocabulary;
