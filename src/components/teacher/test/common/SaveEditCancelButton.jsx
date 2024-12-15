import { Button, Grid2 } from "@mui/material";

export default function SaveEditCancelButton({
  onCancel,
  onEdit,
  onSave,
  isEditing,
  isEditingParent,
  size,
  spacing = 1,
}) {
  const isDisabled = isEditingParent === false; 
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
          onClick={onCancel}
          variant="contained"
          size={size}
          disabled={isDisabled} 
          sx={{
            backgroundColor: "#FF6655",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          Cancel
        </Button>
      </Grid2>
      <Grid2 item>
        <Button
          onClick={onEdit}
          variant="contained"
          size={size}
          disabled={isDisabled || isEditing} 
          sx={{
            backgroundColor: "#FFD014",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          Edit
        </Button>
      </Grid2>
      <Grid2 item>
        <Button
          onClick={onSave}
          variant="contained"
          size={size}
          disabled={isDisabled || !isEditing}  
          sx={{
            backgroundColor: "#00b8a2",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          Save
        </Button>
      </Grid2>
    </Grid2>
  );
}
