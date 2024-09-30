import { Save } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";

export default function SaveButton({ ondel, showText, size }) {
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
          onClick={ondel}
          variant="contained"
          size={size}
          sx={{ backgroundColor: "#64FF64", color: "#000" }}
        >
          {showText ? "Save" : <Save />}
        </Button>
      </Grid2>
    </Grid2>
  );
}
