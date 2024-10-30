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

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: "8px",
}));

export default function WritingAboutTopic() {
  const { writing, essay, wordCount, handleEssayChange } =
    useWritingAboutTopic();

  if (!writing) return;

  return (
    <Grid2 container direction={"column"} spacing={2}>
      <Grid2 item xs={12}>
        <Typography variant="h6">{writing.topic}</Typography>
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
            backgroundColor: "#6EC2F7",
            borderRadius: "0rem",
            paddingX: "2rem",
          }}
        >
          Submit
        </BasicButton>
      </Grid2>
      <Grid2 item xs={12}>
        <Comment />
      </Grid2>
    </Grid2>
  );
}
