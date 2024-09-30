import { Button, Grid2 } from "@mui/material";
import { Save, Edit, Delete } from "@mui/icons-material";

export default function SaveEditDeleteButton({
  ondel,
  onedit,
  onsave,
  showText,
  size,
}) {
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
          sx={{ backgroundColor: "#FF6655", color: "#000" }}
        >
          {showText ? "Delete" : <Delete />}
        </Button>
      </Grid2>
      <Grid2 item>
        <Button
          onClick={onedit}
          variant="contained"
          size={size}
          sx={{ backgroundColor: "#FFD014", color: "#000" }}
        >
          {showText ? "Edit" : <Edit />}
        </Button>
      </Grid2>
      <Grid2 item>
        <Button
          onClick={onsave}
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
