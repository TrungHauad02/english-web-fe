import { Card, Typography } from "@mui/material";
import { StyledPaper } from "./WritingAboutTopic";

export default function Comment({ content }) {
  content =
    "There is a comment here. You should improve your knowledge in vocabulary.";
  return (
    <StyledPaper>
      <Typography variant="body">Comment: {content}</Typography>
    </StyledPaper>
  );
}
