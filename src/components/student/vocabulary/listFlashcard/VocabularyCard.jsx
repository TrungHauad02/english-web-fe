import { Card, styled } from "@mui/material";

import Flippy from "react-flippy";
import FrontCard from "./FrontCard";
import BackCard from "./BackCard";

export const VocabCard = styled(Card)(({ theme }) => ({
  width: "150px",
  height: "200px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
  borderRadius: "10px",
  backgroundColor: "#fff",
  position: "relative",
  margin: "1rem auto",
  marginTop: "1rem",
  [theme.breakpoints.up("md")]: {
    width: "200px",
    height: "250px",
  },
}));

function VocabularyCard({ vocab }) {
  return (
    <Flippy
      flipOnClick={true}
      flipDirection="horizontal"
      style={{ width: "100%", height: "100%" }}
    >
      <FrontCard vocab={vocab} />
      <BackCard vocab={vocab} />
    </Flippy>
  );
}

export default VocabularyCard;
