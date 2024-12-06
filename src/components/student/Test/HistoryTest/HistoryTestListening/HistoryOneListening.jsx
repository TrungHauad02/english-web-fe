import { Box, Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListQuestionSubmit from "../common/ListQuestionSubmit";

function OneListeningTest({ onelistening, dataSubmitTest }) {
  const [showTranscript, setShowTranscript] = useState({});

  const handleToggleTranscript = (id) => {
    setShowTranscript((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <Box
        key={onelistening.id}
        sx={{ mb: 4, p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Question {onelistening?.questions?.[0]?.serial} -{" "}
          {onelistening?.questions?.[onelistening?.questions?.length - 1]?.serial}
        </Typography>
        <audio controls style={{ width: "100%" }}>
          <source src={onelistening.content} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <Button
          onClick={() => handleToggleTranscript(onelistening.id)}
          sx={{ mt: 1, color: "primary.main", textTransform: "none" }}
          variant="text"
          endIcon={
            showTranscript[onelistening.id] ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )
          }
        >
          {showTranscript[onelistening.id] ? "Hide Transcript" : "Show Transcript"}
        </Button>
        <Collapse in={showTranscript[onelistening.id]}>
          <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
            {onelistening.transcript
              ? onelistening.transcript
              : "No transcript available."}
          </Typography>
        </Collapse>
      </Box>
      <ListQuestionSubmit
        dataTest={onelistening.questions}
        dataSubmitTest={dataSubmitTest}
      />
    </>
  );
}

export default OneListeningTest;
