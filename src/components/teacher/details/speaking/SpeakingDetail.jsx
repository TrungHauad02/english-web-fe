import { Stack } from "@mui/material";
import SpeakingInfo from "./SpeakingInfo";
import PeopleInConversation from "./PeopleInConversation";
import Conversation from "./Conversation";
import useSpeakingDetail from "./useSpeakingDetail";
import ErrorComponent from "shared/component/error/ErrorComponent";

export default function SpeakingDetail() {
  const {
    people,
    voices,
    conversation,
    setConversation,
    error,
    setError,
    handleCloseError,
    loading,
  } = useSpeakingDetail();

  const scrollableContainerStyles = {
    boxShadow: "0 0 0.5rem 0.1rem #00000040",
    backgroundColor: "#f1f1f1",
    borderRadius: "0.5rem",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#e0e0e0",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#888",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#555",
    },
  };

  return (
    <Stack
      direction="row"
      sx={{ margin: "2rem 4%" }}
      justifyContent={"space-between"}
      spacing={4}
    >
      <Stack xs={12} sm={5}>
        <SpeakingInfo setError={setError} />
      </Stack>
      <Stack container direction="column" spacing={4}>
        <Stack sx={{ ...scrollableContainerStyles, height: "50vh" }}>
          <PeopleInConversation voices={voices} loading={loading} />
        </Stack>
        <Stack sx={{ ...scrollableContainerStyles, height: "72vh" }}>
          <Conversation
            listPeople={people}
            conversation={conversation}
            setConversation={setConversation}
            setError={setError}
            loading={loading}
          />
        </Stack>
      </Stack>
      {/*Hiển thị khi có lỗi*/}
      {error && (
        <ErrorComponent errorMessage={error} onClose={handleCloseError} />
      )}
    </Stack>
  );
}
