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
  required,
}) {
  return (
    <Stack spacing={1}>
      <Typography
        variant="body1"
        fontWeight={"bold"}
        fontSize={"1rem"}
        sx={{ color: "#000" }}
      >
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <FormControl fullWidth error={required && !value}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={onChange}
          disabled={disabled}
          sx={{
            fontSize: "0.85rem",
            ...sx,
          }}
          required={required}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Typography
                fontSize="0.85rem"
                sx={{ textTransform: "capitalize" }}
              >
                {option}
              </Typography>
            </MenuItem>
          ))}
        </Select>
        {required && !value && (
          <Typography variant="body2" sx={{ color: "red", marginTop: "5px" }}>
            This field is required
          </Typography>
        )}
      </FormControl>
    </Stack>
  );
}
