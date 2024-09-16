import { FrontSide } from "react-flippy";
import { VocabCard } from "./VocabularyCard";
import { CardContent, CardMedia, styled, Typography } from "@mui/material";

const VocabWordCard = styled(CardContent)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  backgroundColor: "rgba(255,255,255,0.5)",
  position: "absolute",
  bottom: 0,
}));

function FrontCard({ vocab }) {
  return (
    <FrontSide style={{ padding: 0, boxShadow: "none" }}>
      <VocabCard>
        <CardMedia
          component="img"
          image={vocab.img}
          alt={vocab.word}
          sx={{ height: "100%", width: "100%" }}
        />
        <VocabWordCard>
          <Typography
            variant="body1"
            sx={{ color: "text.primary", fontWeight: "bold" }}
          >
            {vocab.word}
          </Typography>
        </VocabWordCard>
      </VocabCard>
    </FrontSide>
  );
}

export default FrontCard;
