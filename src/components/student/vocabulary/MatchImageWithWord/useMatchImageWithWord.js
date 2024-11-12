import { useState, useEffect } from "react";
import {shuffleArray} from "shared/utils/shuffle";

const useMatchImageWithWord = (stateVocab) => {
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

  return {
    state,
    onDragEnd,
    handleResetClick,
    getSubmittedContent,
    getScoreContent,
  };
};

export default useMatchImageWithWord;
