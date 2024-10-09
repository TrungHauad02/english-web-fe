import { Grid2, Typography } from "@mui/material";

function Introduction({ title }) {
  return (
    <Grid2
      container
      direction={"row"}
      spacing={2}
      sx={{ marginX: "5%", marginY: "2rem" }}
      alignContent={"center"}
      alignItems={"center"}
    >
      <Typography variant="h6" component="h3">
        Vocabulary in {title} topic
      </Typography>
      <Typography variant="body1" component="p">
        This is the vocabulary in {title} topic. This vocabulary will help you
        to understand the topic better. You can learn the vocabulary by
        flashcard
      </Typography>
    </Grid2>
  );
}

export default Introduction;
