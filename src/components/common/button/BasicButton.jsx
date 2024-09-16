import { Button } from "@mui/material";

function BasicButton({
  onClick,
  content = "Submit",
  variant = "contained",
  startIcon,
  endIcon,
  sx = {
    margin: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "0.25rem",
    backgroundColor: "#ACCD0A",
    color: "#000",
  },
}) {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={sx}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {content}
    </Button>
  );
}

export default BasicButton;
