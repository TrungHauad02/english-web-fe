import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import VocabularyList from "./VocabularyList";
import VocabularyContainer from "./VocabularyContainer";
import { stateVocab } from "../ListVocab";
import { Card, Grid2, styled } from "@mui/material";
import ResetButton from "../../../common/button/ResetButton";
import SubmitButton from "../../../common/button/SubmitButton";
import ConfirmDialog from "../../common/ConfirmDialog";

const Title = styled("h4")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: "1rem 0",
});

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function MatchImageWithWord() {
  const [state, setState] = useState(stateVocab);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [scoreDialogOpen, setScoreDialogOpen] = useState(false);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      listVocabOrder: shuffleArray(prevState.listVocabOrder),
    }));
  }, []);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId) return;

    const sourceVocab = state.listVocab.find((item) => item.id === draggableId);
    const newListVocabOrder = state.listVocabOrder.filter(
      (id) => id !== draggableId
    );

    if (destination.droppableId !== "word-container") {
      const container = state.listContainer[destination.droppableId];
      if (container.contain) {
        newListVocabOrder.splice(destination.index, 0, container.contain);
      }
    }

    const newListContainer = {
      ...state.listContainer,
      [destination.droppableId]: {
        id: destination.droppableId,
        contain: sourceVocab.id,
      },
    };

    setState({
      ...state,
      listVocabOrder: newListVocabOrder,
      listContainer: newListContainer,
    });
  };

  const handleResetClick = () => {
    setState({
      ...stateVocab,
      listVocabOrder: shuffleArray(stateVocab.listVocabOrder),
    });
  };

  const handleSubmitClick = () => {
    setConfirmDialogOpen(false);
    setScoreDialogOpen(true);
  };
  const handleConfirmDialogOpen = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const getSubmittedContent = () => {
    const total = state.listVocab.length;
    const unanswered = state.listVocabOrder.length;
    const answered = total - unanswered;

    return `Answered questions: ${answered} out of ${total}. Do you want to finish?`;
  };

  const handleScoreDialogClose = () => {
    setScoreDialogOpen(false);
  };

  const getScoreContent = () => {
    let score = 0;
    const total = state.listVocab.length;

    Object.values(state.listContainer).forEach((container) => {
      if (container.contain === container.id) {
        score++;
      }
    });

    return `Your Score: ${score}/${total}`;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Card
        sx={{
          marginX: "5%",
          marginY: "1%",
          padding: "1%",
          backgroundColor: "#F0F6D4",
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
        <Grid2 container justifyContent="flex-end">
          <ResetButton onClick={handleResetClick} />
          <SubmitButton onClick={handleConfirmDialogOpen} />
          <ConfirmDialog
            open={confirmDialogOpen}
            onClose={handleConfirmDialogClose}
            onAgree={handleSubmitClick}
            title="Confirmation"
            content={getSubmittedContent()}
            cancelText={"Cancel"}
            agreeText={"Submit"}
          />
          <ConfirmDialog
            open={scoreDialogOpen}
            onClose={handleScoreDialogClose}
            onAgree={handleScoreDialogClose}
            title="Submition"
            content={getScoreContent()}
            cancelText={"Ok"}
          />
        </Grid2>
      </Card>
    </DragDropContext>
  );
}

export default MatchImageWithWord;
