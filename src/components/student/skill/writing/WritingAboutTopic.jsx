import {
  Box,
  Grid2,
  Paper,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useCallback } from "react";
import BasicButton from "../../../common/button/BasicButton";
import Comment from "./Comment";

const writing = {
  content:
    "Write a paragraph about the topic below. You should write about 100 words.",
};
export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: "8px",
}));

export default function WritingAboutTopic() {
  const [essay, setEssay] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    setEssay(text);
    setWordCount(text.trim() === "" ? 0 : text.trim().split(/\s+/).length);
  }, []);
  return (
    <Grid2 container direction={"column"} spacing={2}>
      <Grid2 item xs={12}>
        <Typography variant="h6">{writing.content}</Typography>
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
            backgroundColor: "#ACCD0A",
            borderRadius: "0rem",
            paddingX: "2rem",
          }}
        >
          Submit
        </BasicButton>
      </Grid2>
      <Grid2 item xs={12}>
        <Comment content={essay} />
      </Grid2>
    </Grid2>
  );
}
