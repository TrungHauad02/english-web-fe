import { BackSide } from "react-flippy";
import { VocabCard } from "./VocabularyCard";
import { Button, Grid2, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

function BackCard({ vocab }) {
  const handleSpeakerClick = (event) => {
    event.stopPropagation();
    const utterance = new SpeechSynthesisUtterance(vocab.word);
    speechSynthesis.speak(utterance);
  };

  return (
    <BackSide style={{ padding: 0, boxShadow: "none" }}>
      <VocabCard
        sx={{
          justifyContent: "space-evenly",
          paddingTop: "1rem",
          paddingX: "1rem",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {vocab.word}
        </Typography>
        <Grid2 container>
          <Grid2 item size={10}>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              {vocab.phonetic}
            </Typography>
          </Grid2>
          <Grid2 item size={2} sx={{ position: "absolute", right: "1rem" }}>
            <Button
              size="small"
              color="primary"
              startIcon={
                <VolumeUpIcon sx={{ color: "black" }} fontSize="large" />
              }
              onClick={handleSpeakerClick}
            ></Button>
          </Grid2>
        </Grid2>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", fontWeight: "bold" }}
        >
          {vocab.meaning}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.primary" }}>
          Example: {vocab.example}
        </Typography>
      </VocabCard>
    </BackSide>
  );
}

export default BackCard;
