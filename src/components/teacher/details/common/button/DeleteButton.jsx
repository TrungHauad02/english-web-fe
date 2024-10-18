import { Delete } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";

export default function DeleteButton({ onDel, showText, size, disabled }) {
  return (
    <Grid2
      container
      direction="row"
      spacing={1}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid2 item>
        <Button
          onClick={onDel}
          disabled={disabled}
          variant="contained"
          size={size}
          sx={{ backgroundColor: "#FF6655", color: "#000" }}
        >
          {showText ? "Delete" : <Delete />}
        </Button>
      </Grid2>
    </Grid2>
  );
}
