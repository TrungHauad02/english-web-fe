import { DragDropContext } from "react-beautiful-dnd";
import VocabularyList from "./VocabularyList";
import VocabularyContainer from "./VocabularyContainer";
import { Card, Grid2, styled } from "@mui/material";
import ResetButton from "shared/component/button/ResetButton";
import ConfirmAndSubmit from "../../../../shared/component/confirmDialog/ConfirmAndSubmit";
import useMatchImageWithWord from "./useMatchImageWithWord";

const Title = styled("h4")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: "1rem 0",
  marginBottom: "2rem",
  color: "#000",
});

function MatchImageWithWord({ stateVocab }) {
  const {
    state,
    onDragEnd,
    handleResetClick,
    getSubmittedContent,
    getScoreContent,
  } = useMatchImageWithWord(stateVocab);

  if (!state) return <></>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card
        sx={{
          marginX: "5%",
          marginY: "1%",
          padding: "1%",
          background: "#f1f1f1",
          borderRadius: "0.5rem",
        }}
      >
        <Title>Match Image With Word</Title>
        <VocabularyList
          listVocabOrder={state.listVocabOrder}
          listVocab={state.listVocab}
        />
        <VocabularyContainer
          listContainer={state.listContainer}
          listVocab={state.listVocab}
        />
        <Grid2 container justifyContent="flex-end" sx={{ marginTop: "3rem" }}>
          <ResetButton onClick={handleResetClick} />
          <ConfirmAndSubmit
            sx={{
              fontSize: "1rem",
              padding: "0.5rem 1rem",
              margin: "1rem",
            }}
            submitContent={getSubmittedContent()}
            scoreContent={getScoreContent()}
          />
        </Grid2>
      </Card>
    </DragDropContext>
  );
}

export default MatchImageWithWord;
