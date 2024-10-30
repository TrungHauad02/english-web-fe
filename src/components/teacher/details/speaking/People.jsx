import { Button, Grid2, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteButton from "../common/button/DeleteButton";
import SaveButton from "../common/button/SaveButton";

export default function People({ name, setName, onDelete, onAdd, disabled }) {
  const [isEdit, setIsEdit] = useState(false);
  const [newName, setNewName] = useState(name);

  useEffect(() => {
    if (disabled) {
      setIsEdit(false);
    }
  }, [disabled]);

  return (
    <Grid2
      container
      direction={"row"}
      spacing={2}
      sx={{
        backgroundColor: "#fff",
        padding: "0.35rem",
        borderRadius: "0.5rem",
        height: "100%",
      }}
    >
      {name !== "" ? (
        <Grid2 container alignItems={"center"} direction={"row"}>
          <Grid2 item>
            <TextField
              disabled={disabled}
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ maxWidth: "10rem" }}
            />
          </Grid2>
          <Grid2 item>
            <DeleteButton disabled={disabled} onDel={onDelete} size="medium" />
          </Grid2>
        </Grid2>
      ) : isEdit ? (
        <Grid2 container alignItems={"center"} direction={"row"}>
          <Grid2 item>
            <TextField
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              sx={{ maxWidth: "10rem" }}
            />
          </Grid2>
          <Grid2 item>
            <SaveButton
              onSave={() => {
                onAdd(newName);
                setNewName("");
                setIsEdit(false);
              }}
            />
          </Grid2>
        </Grid2>
      ) : (
        <Grid2
          container
          alignItems={"center"}
          direction={"row"}
          sx={{ width: "100%" }}
        >
          <Grid2 item>
            <Button
              disabled={disabled}
              onClick={() => {
                setNewName("");
                setIsEdit(true);
              }}
              sx={{
                fontStyle: "italic",
                textDecoration: "underline",
                textTransform: "capitalize",
              }}
            >
              + Add new people
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
}
