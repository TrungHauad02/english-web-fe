import { FrontSide } from "react-flippy";
import { VocabCard } from "./VocabularyCard";
import { CardContent, CardMedia, styled, Typography } from "@mui/material";

const VocabWordCard = styled(CardContent)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  paddingTop: "2rem",
  backgroundColor: "#dfdfdf",
  position: "absolute",
  transition: "all 0.5s",
  bottom: "-22%",
  ":hover": {
    backgroundColor: "#dfdfdf7f",
    bottom: "0",
  },
}));

function FrontCard({ vocab }) {
  return (
    <FrontSide style={{ padding: 0, boxShadow: "none" }}>
      <VocabCard>
        <CardMedia
          component="img"
          image={vocab.image}
          alt={vocab.word}
          sx={{ height: "100%", width: "100%" }}
        />
        <VocabWordCard>
          <Typography
            variant="body1"
            sx={{ color: "#000", fontWeight: "bold" }}
          >
            {vocab.word}
          </Typography>
        </VocabWordCard>
      </VocabCard>
    </FrontSide>
  );
}

export default FrontCard;
