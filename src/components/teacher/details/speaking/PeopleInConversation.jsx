import { Grid2, Typography } from "@mui/material";
import EditButton from "../common/button/EditButton";
import SaveButton from "../common/button/SaveButton";
import People from "./People";
import usePeopleInConversation from "./usePeopleInConversation";

export default function PeopleInConversation({
  listPeople,
  setListPeople,
  conversation,
  setConversation,
  setError,
}) {
  const {
    isEditing,
    peopleRows,
    onDeletePeople,
    onAddPeople,
    handleEditing,
    handleSave,
    setName,
  } = usePeopleInConversation(
    listPeople,
    setListPeople,
    conversation,
    setConversation,
    setError
  );

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
          backgroundColor: "#fff",
          padding: "1rem 1rem",
          zIndex: 3,
          boxShadow: "0 0 0.5rem 0.1rem #00000030",
        }}
      >
        <Grid2 item>
          <Typography variant="h6">People talks in the conversation</Typography>
        </Grid2>
        <Grid2 container direction={"row"} spacing={4}>
          <EditButton showText onEdit={handleEditing} />
          <SaveButton showText onSave={handleSave} />
        </Grid2>
      </Grid2>
      <Grid2
        container
        direction={"column"}
        spacing={2}
        sx={{ padding: "0.5rem", marginBottom: "1rem" }}
      >
        {peopleRows.map((row, rowIndex) => (
          <Grid2 container item key={rowIndex} justifyContent={"flex-start"}>
            {row.map((name, index) => (
              <Grid2 item key={index} xs={4}>
                <People
                  name={name}
                  setName={(newName) => setName(rowIndex * 3 + index, newName)}
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
