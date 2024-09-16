import { Droppable } from "react-beautiful-dnd";
import { Grid2, Box } from "@mui/material";
import ItemImage from "./ItemImage";
import ItemWord from "./ItemWord";

function VocabularyContainer({ listContainer, listVocab }) {
  return (
    <Grid2
      container
      spacing={2}
      sx={{ marginTop: "1rem" }}
      alignContent={"center"}
      justifyContent={"space-evenly"}
    >
      {Object.keys(listContainer).map((key) => {
        const container = listContainer[key];
        const vocab = listVocab.find((v) => v.id === container.id);
        return (
          <Grid2 item size={1} key={key}>
            <ItemImage src={vocab.img} alt={vocab.word} />
            <Droppable droppableId={container.id}>
              {(provided, snapshot) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  sx={{
                    justifyContent: "center",
                    marginTop: "0.5rem",
                    height: "2.5rem",
                    width: "100%",
                    minWidth: "4rem",
                    borderRadius: "0.25rem",
                    background: snapshot.isDraggingOver ? "skyblue" : "#ffffff",
                  }}
                >
                  {provided.placeholder}
                  {container.contain ? (
                    <ItemWord>
                      {
                        listVocab.find(
                          (vocab) => vocab.id === container.contain
                        ).word
                      }
                    </ItemWord>
                  ) : null}
                </Box>
              )}
            </Droppable>
          </Grid2>
        );
      })}
    </Grid2>
  );
}

export default VocabularyContainer;
