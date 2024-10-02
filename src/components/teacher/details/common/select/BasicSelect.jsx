import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack, Typography } from "@mui/material";

export default function BasicSelect({
  value,
  onChange,
  label,
  options,
  sx,
  disabled,
}) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="body"
        fontWeight={"bold"}
        fontSize={"1rem"}
        sx={{ color: "#000" }}
      >
        {label}
      </Typography>
      <FormControl fullWidth>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
          sx={sx}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography textTransform={"capitalize"}>{option}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
