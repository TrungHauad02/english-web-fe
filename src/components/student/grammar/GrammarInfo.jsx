import { Stack, Typography } from "@mui/material";

function GrammarInfo({ grammar }) {
  return (
    <Stack direction={"column"} sx={{ marginX: "5%", marginY: "1rem" }} gap={2}>
      <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
        What is {grammar.title} ?
      </Typography>
      <Typography
        variant="body"
        sx={{ fontSize: "1.5rem", marginLeft: "2rem" }}
      >
        {grammar.content}
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "1.5rem" }}>
        Example:
      </Typography>
      <Typography
        variant="body"
        sx={{ fontSize: "1.5rem", marginLeft: "2rem" }}
      >
        {grammar.example}
      </Typography>
    </Stack>
  );
}

export default GrammarInfo;
