import { Grid2, Typography } from "@mui/material";

export default function Question({ index, content }) {
  return (
    <Grid2 container spacing={2} sx={{ marginY: "1rem", marginLeft: "1rem" }}>
      <Typography
        variant="body"
        component="body"
        sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
      >
        Question {index}:{" "}
      </Typography>
      <Typography variant="body" component="body" sx={{ fontSize: "1.25rem" }}>
        {content}
      </Typography>
    </Grid2>
  );
}
