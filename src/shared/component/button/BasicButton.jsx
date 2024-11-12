import { Button } from "@mui/material";
import useColor from "shared/color/Color";

function BasicButton({
  onClick,
  content = "Submit",
  variant = "contained",
  startIcon,
  endIcon,
  sx,
}) {
  const { Color2_1 } = useColor();
  const complexSx = {
    borderRadius: "0.25rem",
    backgroundColor: Color2_1,
    color: "#000",
    textTransform:"none",
    ...sx
  }

  return (
    <Button
      onClick={onClick}
      variant={variant}
      sx={complexSx}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {content}
    </Button>
  );
}

export default BasicButton;
