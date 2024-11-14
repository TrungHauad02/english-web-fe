import {
  Box,
  Grid2,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import BasicButton from "shared/component/button/BasicButton";
import Comment from "./Comment";
import useWritingAboutTopic from "./useWritingAboutTopic";
import useColor from "shared/color/Color";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: "8px",
}));

export default function WritingAboutTopic({ writing }) {
  const { essay, wordCount, handleEssayChange, comment, handleSubmit, score } =
    useWritingAboutTopic(writing.topic);

  const color = useColor();

  if (!writing) return;

  return (
    <Grid2 container direction={"column"} spacing={2}>
      <Grid2 item xs={12}>
        <Typography variant="h6">Write about topic: {writing.topic}</Typography>
      </Grid2>
      <Grid2 item xs={12}>
        <StyledPaper elevation={3}>
          <TextField
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            placeholder="Type your essay here..."
            value={essay}
            onChange={handleEssayChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.23)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(0, 0, 0, 0.5)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "primary.main",
                },
              },
            }}
          />
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Words Count: {wordCount}</Typography>
          </Box>
        </StyledPaper>
      </Grid2>
      <Grid2 item xs={12} textAlign={"right"} sx={{ marginRight: "1rem" }}>
        <BasicButton
          sx={{
            color: "#fff",
            backgroundColor: color.Color2_1,
            borderRadius: "0rem",
            paddingX: "2rem",
          }}
          onClick={handleSubmit}
        >
          Submit
        </BasicButton>
      </Grid2>
      {score && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Score">
            <Comment content={"Score: " + score} />
          </CollapsibleSection>
        </Grid2>
      )}
      {comment && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Comments">
            <Comment content={"Comment: " + comment} />
          </CollapsibleSection>
        </Grid2>
      )}
    </Grid2>
  );
}
