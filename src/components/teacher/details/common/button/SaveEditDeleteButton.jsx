import { Button, Grid2 } from "@mui/material";
import { Save, Edit, Delete } from "@mui/icons-material";

export default function SaveEditDeleteButton({
  onDel,
  onEdit,
  onSave,
  showText,
  size,
  spacing = 1,
}) {
  return (
    <Grid2
      container
      direction="row"
      spacing={spacing}
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Grid2 item>
        <Button
          onClick={onDel}
          variant="contained"
          size={size}
          sx={{
            backgroundColor: "#FF6655",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          {showText ? "Delete" : <Delete />}
        </Button>
      </Grid2>
      <Grid2 item>
        <Button
          onClick={onEdit}
          variant="contained"
          size={size}
          sx={{
            backgroundColor: "#FFD014",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          {showText ? "Edit" : <Edit />}
        </Button>
      </Grid2>
      <Grid2 item>
        <Button
          onClick={onSave}
          variant="contained"
          size={size}
          sx={{
            backgroundColor: "#64FF64",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          {showText ? "Save" : <Save />}
        </Button>
      </Grid2>
    </Grid2>
  );
}
