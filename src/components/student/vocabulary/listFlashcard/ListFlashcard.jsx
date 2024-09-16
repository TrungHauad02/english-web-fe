import { Grid2 } from "@mui/material";
import VocabularyCard from "./VocabularyCard";

function ListFlashcard({ list }) {
  return (
    <Grid2
      container
      direction={"row"}
      alignItems={"center"}
      justifyContent="space-evenly"
      sx={{
        backgroundColor: "#D6F153",
        marginTop: "1rem",
        paddingY: "1rem",
      }}
    >
      {list.map((vocab) => (
        <Grid2 item xs={6} size={3}>
          <VocabularyCard key={vocab.id} vocab={vocab} />
        </Grid2>
      ))}
    </Grid2>
  );
}

export default ListFlashcard;
