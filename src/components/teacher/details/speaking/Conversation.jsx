import {
  Button,
  FormControl,
  Grid2,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import EditButton from "../common/button/EditButton";
import SaveButton from "../common/button/SaveButton";
import { useState } from "react";
import DeleteButton from "../common/button/DeleteButton";
import { v4 as uuidv4 } from "uuid";

export default function Conversation({
  listPeople,
  conversation,
  setConversation,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const hanleAddNewLine = () => {
    const newConversation = [
      ...conversation,
      {
        id: uuidv4(),
        name: listPeople[0],
        serial: conversation.length + 1,
        content: "",
      },
    ];
    setConversation(newConversation);
  };

  return (
    <Grid2 container direction={"column"} sx={{ width: "100%" }}>
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
          <Typography variant="h6">Conversation</Typography>
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
        sx={{
          width: "100%",
          padding: "1rem 1rem",
        }}
      >
        {conversation.map((line, index) => (
          <Line
            key={index}
            listPeople={listPeople}
            line={line}
            disabled={!isEditing}
            conversation={conversation}
            setConversation={setConversation}
          />
        ))}
        <Button
          onClick={hanleAddNewLine}
          disabled={!isEditing}
          sx={{
            textDecoration: "underline",
            fontStyle: "italic",
            color: "#000",
          }}
        >
          Add New Line
        </Button>
      </Grid2>
    </Grid2>
  );
}

function Line({ listPeople, line, disabled, conversation, setConversation }) {
  const sx = {};
  const onChangeName = (event) => {
    const newConversation = conversation.map((item) => {
      if (item.id === line.id) {
        return { ...item, name: event.target.value };
      }
      return item;
    });
    setConversation(newConversation);
  };

  const onChangeContent = (event) => {
    const newConversation = conversation.map((item) => {
      if (item.id === line.id) {
        return { ...item, content: event.target.value };
      }
      return item;
    });
    setConversation(newConversation);
  };

  const onDeleteLine = () => {
    const newConversation = conversation.filter((item) => item.id !== line.id);
    setConversation(newConversation);
  };

  return (
    <Grid2 container direction={"row"} spacing={2}>
      <Grid2 item size={2}>
        <FormControl fullWidth sx={{ backgroundColor: "#fff" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={line.name}
            onChange={onChangeName}
            disabled={disabled}
            sx={sx}
          >
            {listPeople.map((option) => (
              <MenuItem key={option} value={option}>
                <Typography textTransform={"capitalize"}>{option}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid2>
      <Grid2 container direction={"row"} size={10} alignItems={"center"}>
        <Grid2 item size={10}>
          <TextField
            value={line.content}
            onChange={onChangeContent}
            sx={{ backgroundColor: "#fff" }}
            disabled={disabled}
            fullWidth
          />
        </Grid2>
        <Grid2 item size={2}>
          <DeleteButton ondel={onDeleteLine} disabled={disabled} />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
