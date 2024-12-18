import {
  Button,
  CircularProgress,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import EditButton from "../common/button/EditButton";
import SaveButton from "../common/button/SaveButton";
import Line from "./Line";
import useConversation from "./useConversation";

export default function Conversation({
  listPeople,
  conversation,
  setConversation,
  setError,
  loading,
}) {
  const { isEditing, isSaving, handleAddNewLine, handleEditing, handleSave } =
    useConversation(listPeople, conversation, setConversation, setError);

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
          <EditButton showText onEdit={handleEditing} disabled={isSaving} />
          <SaveButton showText onSave={handleSave} disabled={isSaving} />
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
        disabled={isSaving}
      >
        {loading && (
          <Stack justifyContent={"center"} alignItems={"center"}>
            <CircularProgress />
          </Stack>
        )}
        {!loading &&
          conversation.map((line, index) => (
            <Line
              key={index}
              listPeople={listPeople}
              line={line}
              disabled={!isEditing}
              conversation={conversation}
              setConversation={setConversation}
              index={index}
            />
          ))}
        <Button
          onClick={handleAddNewLine}
          disabled={!isEditing}
          sx={{
            textDecoration: "underline",
            textTransform: "capitalize",
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
