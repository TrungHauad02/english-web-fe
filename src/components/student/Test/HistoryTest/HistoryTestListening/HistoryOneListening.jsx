import { Box, Button, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HistoryListQuestion from "../common/HistoryListQuestion";

function OneListeningTest({ oneListening, dataSubmitTest,focusId }) {
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
        key={oneListening.id}
        sx={{ mb: 4, p: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, fontWeight: "bold" }}
        >
          Question {oneListening?.questions?.[0]?.serial} -{" "}
          {oneListening?.questions?.[oneListening?.questions?.length - 1]?.serial}
        </Typography>
        <audio controls style={{ width: "100%" }}>
          <source src={oneListening.content} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
        <Button
          onClick={() => handleToggleTranscript(oneListening.id)}
          sx={{ mt: 1, color: "primary.main", textTransform: "none" }}
          variant="text"
          endIcon={
            showTranscript[oneListening.id] ? (
              <ExpandLessIcon />
            ) : (
              <ExpandMoreIcon />
            )
          }
        >
          {showTranscript[oneListening.id] ? "Hide Transcript" : "Show Transcript"}
        </Button>
        <Collapse in={showTranscript[oneListening.id]}>
          <Typography variant="body2" sx={{ ml: 2, mt: 1 }}>
            {oneListening.transcript
              ? oneListening.transcript
              : "No transcript available."}
          </Typography>
        </Collapse>
      </Box>
      <HistoryListQuestion
        dataTest={oneListening.questions}
        dataSubmitTest={dataSubmitTest}
        focusId={focusId}
      />
    </>
  );
}

export default OneListeningTest;
