import { Stack, TextField, Typography } from "@mui/material";

export default function MultiLineTextField({
  label,
  value,
  onChange,
  disabled,
  type,
  sx,
  rows = 3,
  required,
}) {
  const complexSx = {
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
        sx={complexSx}
        type={type}
        variant="outlined"
        fullWidth
        multiline
        disabled={disabled}
        rows={rows}
        required={required}
        error={required && !value}
        helperText={required && !value ? "This field is required" : ""}
      />
    </Stack>
  );
}
