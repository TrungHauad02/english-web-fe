import { Edit } from "@mui/icons-material";
import { Button, Grid2 } from "@mui/material";

export default function EditButton({ onEdit, showText, size, disabled }) {
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
          onClick={onEdit}
          variant="contained"
          size={size}
          disabled={disabled}
          sx={{ backgroundColor: "#FFD014", color: "#000" }}
        >
          {showText ? "Edit" : <Edit />}
        </Button>
      </Grid2>
    </Grid2>
  );
}
