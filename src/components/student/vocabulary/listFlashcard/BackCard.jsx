import { BackSide } from "react-flippy";
import { VocabCard } from "./VocabularyCard";
import { Button, Stack, Typography } from "@mui/material";
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
        <Stack container>
          <Stack>
            <Typography variant="body1" sx={{ color: "text.primary" }}>
              {vocab.phonetic}
            </Typography>
          </Stack>
          <Stack sx={{ position: "absolute", right: "0%", padding: "0rem" }}>
            <Button size="small" color="primary" onClick={handleSpeakerClick}>
              <VolumeUpIcon sx={{ color: "black" }} fontSize="small" />
            </Button>
          </Stack>
        </Stack>
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
