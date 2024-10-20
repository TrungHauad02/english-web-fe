import { TextField } from "@mui/material";

const CustomTextField = ({
  value,
  onChange,
  maxWidth = "4rem",
  minWidth,
  disabled,
  type = "text",
  sx = {
    maxWidth: maxWidth,
    minWidth: minWidth,
    "& .MuiInputBase-root": {
      fontSize: "1rem",
      padding: "0",
    },
  },
}) => {
  const combinedSx = {
    ...sx,
  };
  return (
    <TextField
      value={value}
      onChange={onChange}
      type={type}
      disabled={disabled}
      variant="outlined"
      sx={combinedSx}
    />
  );
};

export default CustomTextField;
