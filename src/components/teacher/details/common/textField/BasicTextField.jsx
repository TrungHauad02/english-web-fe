import { Stack, TextField, Typography } from "@mui/material";

export default function BasicTextField({
  label,
  value,
  onChange,
  type,
  sx = { color: "#828282" },
}) {
  const combinedSx = {
    ...sx,
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
        sx={combinedSx}
        type={type}
        variant="outlined"
        fullWidth
      />
    </Stack>
  );
}
