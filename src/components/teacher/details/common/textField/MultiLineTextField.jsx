import { Stack, TextField, Typography } from "@mui/material";

export default function MultiLineTextField({
  label,
  value,
  onChange,
  disabled,
  type,
  sx,
  rows = 3,
}) {
  const complexSx = {
    ...sx,
    color: "#828282",
  };
  return (
    <Stack direction={"column"} spacing={1}>
      <Typography
        variant="body"
        fontWeight={"bold"}
        fontSize={"1rem"}
        sx={{ color: "#000" }}
      >
        {label}
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
      />
    </Stack>
  );
}
