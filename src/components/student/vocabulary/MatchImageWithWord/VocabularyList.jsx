import { Droppable, Draggable } from "react-beautiful-dnd";
import { Grid2 } from "@mui/material";
import ItemWord from "./ItemWord";

function VocabularyList({ listVocabOrder, listVocab }) {
  return (
    <Droppable droppableId="word-container" direction="horizontal">
      {(provided) => (
        <Grid2
          container
          spacing={2}
          ref={provided.innerRef}
          {...provided.droppableProps}
          justifyContent={"space-evenly"}
        >
          {listVocabOrder.map((id, index) => {
            const vocab = listVocab.find((item) => item.id === id);
            return (
              <Draggable key={vocab.id} draggableId={vocab.id} index={index}>
                {(provided) => (
                  <Grid2
                    item
                    xs={6}
                    size={1}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <ItemWord>{vocab.word}</ItemWord>
                  </Grid2>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </Grid2>
      )}
    </Droppable>
  );
}

export default VocabularyList;
