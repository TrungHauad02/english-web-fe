import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import VocabularyList from "./VocabularyList";
import VocabularyContainer from "./VocabularyContainer";
import { Card, Grid2, styled } from "@mui/material";
import ResetButton from "../../../common/button/ResetButton";
import ConfirmAndSubmit from "../../common/ConfirmAndSubmit";

const Title = styled("h4")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: "1rem 0",
  marginBottom: "2rem",
  color: "#000",
});

const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function MatchImageWithWord({ stateVocab }) {
  const [state, setState] = useState(stateVocab);

  useEffect(() => {
    if (stateVocab) {
      setState({
        ...stateVocab,
        listVocabOrder: shuffleArray(stateVocab.listVocabOrder),
      });
    }
  }, [stateVocab]);

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

    setState((prevState) => ({
      ...prevState,
      listVocabOrder: newListVocabOrder,
      listContainer: newListContainer,
    }));
  };

  const handleResetClick = () => {
    setState({
      ...stateVocab,
      listVocabOrder: shuffleArray(stateVocab.listVocabOrder),
    });
  };

  const getSubmittedContent = () => {
    const total = state.listVocab.length;
    const unanswered = state.listVocabOrder.length;
    const answered = total - unanswered;

    return `Answered questions: ${answered} out of ${total}. Do you want to finish?`;
  };

  const getScoreContent = () => {
    let score = 0;
    const total = state.listVocab.length;

    Object.values(state.listContainer).forEach((container) => {
      if (
        container.contain ===
        state.listVocab.find((vocab) => vocab.id === container.id)?.id
      ) {
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
        <Grid2 container justifyContent="flex-end">
          <ResetButton onClick={handleResetClick} />
          <ConfirmAndSubmit
            submitContent={getSubmittedContent()}
            scoreContent={getScoreContent()}
          />
        </Grid2>
      </Card>
    </DragDropContext>
  );
}

export default MatchImageWithWord;
