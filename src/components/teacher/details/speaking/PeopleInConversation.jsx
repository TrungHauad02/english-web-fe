import { useEffect, useState } from "react"; // Import useState hook
import { Button, Grid2, TextField, Typography } from "@mui/material";
import EditButton from "../common/button/EditButton";
import SaveButton from "../common/button/SaveButton";
import DeleteButton from "../common/button/DeleteButton";

export default function PeopleInConversation({ listPeople, setListPeople }) {
  const [isEditing, setIsEditing] = useState(false);

  if (listPeople[listPeople.length - 1] !== "") listPeople.push("");

  const peopleRows = [];
  for (let i = 0; i < listPeople.length; i += 3) {
    peopleRows.push(listPeople.slice(i, i + 3));
  }

  const onDeletePeople = (index) => {
    const newListPeople = [...listPeople];
    newListPeople.splice(index, 1);
    setListPeople(newListPeople);
  };

  const onAddPeople = (name) => {
    const newListPeople = [...listPeople];
    newListPeople.pop("");
    newListPeople.push(name);
    setListPeople(newListPeople);
  };

  return (
    <Grid2
      container
      direction={"column"}
      spacing={2}
      sx={{
        width: "100%",
      }}
    >
      <Grid2
        container
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#FFF4CC",
          padding: "1rem 1rem",
          zIndex: 3,
          boxShadow: "0 0 0.5rem 0.1rem #00000030",
        }}
      >
        <Grid2 item>
          <Typography variant="h6">People talks in the conversation</Typography>
        </Grid2>
        <Grid2 container direction={"row"} spacing={4}>
          <EditButton showText onedit={() => setIsEditing(true)} />
          <SaveButton showText ondel={() => setIsEditing(false)} />
        </Grid2>
      </Grid2>
      <Grid2
        container
        direction={"column"}
        spacing={2}
        sx={{ padding: "0rem 1rem", marginBottom: "1rem" }}
      >
        {peopleRows.map((row, rowIndex) => (
          <Grid2 container item key={rowIndex} justifyContent={"flex-start"}>
            {row.map((name, index) => (
              <Grid2 item key={index} xs={4}>
                <People
                  name={name}
                  disabled={!isEditing}
                  onDelete={() => onDeletePeople(rowIndex * 3 + index)}
                  onAdd={onAddPeople}
                />
              </Grid2>
            ))}
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}

function People({ name, onDelete, onAdd, disabled }) {
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
        padding: "0.5rem",
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
              sx={{ maxWidth: "10rem" }}
            />
          </Grid2>
          <Grid2 item>
            <DeleteButton disabled={disabled} ondel={onDelete} />
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
              ondel={() => {
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
              sx={{ fontStyle: "italic", textDecoration: "underline" }}
            >
              + Add new people
            </Button>
          </Grid2>
        </Grid2>
      )}
    </Grid2>
  );
}
