import { Stack, TextField, Typography } from "@mui/material";

export default function BasicTextField({
  label,
  value,
  onChange,
  type,
  sx,
  disabled,
  required,
}) {
  const combinedSx = {
    ...sx,
    color: "#828282",
  };

  return (
    <Stack direction={"column"} spacing={1}>
      <Typography
        variant="body1"
        fontWeight={"bold"}
        fontSize={"1rem"}
        sx={{ color: "#000" }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <TextField
        value={value}
        onChange={onChange}
        sx={combinedSx}
        type={type}
        variant="outlined"
        fullWidth
        disabled={disabled}
        required={required}
        error={required && !value}
        helperText={required && !value ? "This field is required" : ""}
      />
    </Stack>
  );
}
