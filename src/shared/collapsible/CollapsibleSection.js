import { useState } from "react";
import { Button, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const CollapsibleSection = ({ buttonText, children }) => {
  const [showContent, setShowContent] = useState(false);

  const buttonStyles = {
    margin: "1rem 2%",
    backgroundColor: "#f1f1f1",
    color: "#000",
    justifyContent: "space-between",
    display: "flex",
    width: "96%",
    textAlign: "left",
    textTransform: "capitalize",
    fontSize: "1.25rem",
    padding: "1rem 1.5rem",
  };

  const collapseStyles = {
    paddingX: "1.5rem",
  };

  return (
    <>
      <Button
        onClick={() => setShowContent(!showContent)}
        sx={buttonStyles}
      >
        {buttonText}
        {showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      <Collapse in={showContent} timeout={{ enter: 1000, exit: 500 }} sx={collapseStyles}>
        {children}
      </Collapse>
    </>
  );
};

export default CollapsibleSection;
