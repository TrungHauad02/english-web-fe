import { Typography } from "@mui/material";
import { StyledPaper } from "./WritingAboutTopic";

export default function Comment({ content }) {
  return (
    <StyledPaper>
      <Typography variant="body">{content}</Typography>
    </StyledPaper>
  );
}
