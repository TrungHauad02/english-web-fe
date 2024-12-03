import { TextField, Typography, Stack } from "@mui/material";

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
      fontSize: "0.85rem",
      padding: "0",
    },
  },
  label,
  required = false,
}) => {
  const combinedSx = {
    ...sx,
  };

  return (
    <Stack spacing={1}>
      <Typography
        variant="body1"
        fontWeight={"bold"}
        fontSize={"1rem"}
        sx={{ color: "#000" }}
      >
        {label}
      </Typography>
      <TextField
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
        variant="outlined"
        sx={combinedSx}
        required={required}
        error={required && !value}
        helperText={required && !value ? "This field is required" : ""}
      />
    </Stack>
  );
};

export default CustomTextField;
