import { Grid2 } from "@mui/material";
import SpeakingInfo from "./SpeakingInfo";
import PeopleInConversation from "./PeopleInConversation";
import Conversation from "./Conversation";
import useSpeakingDetail from "./useSpeakingDetail";

export default function SpeakingDetail() {
  const { people, setPeople, conversation, setConversation } =
    useSpeakingDetail();

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
    <Grid2
      container
      direction="row"
      sx={{ margin: "2rem 4%" }}
      justifyContent={"space-between"}
    >
      <Grid2 item xs={12} sm={5}>
        <SpeakingInfo />
      </Grid2>
      <Grid2 container xs={12} sm={7} direction="column" spacing={4}>
        <Grid2 item sx={{ ...scrollableContainerStyles, height: "50vh" }}>
          <PeopleInConversation listPeople={people} setListPeople={setPeople} />
        </Grid2>
        <Grid2 item sx={{ ...scrollableContainerStyles, height: "72vh" }}>
          <Conversation
            listPeople={people}
            conversation={conversation}
            setConversation={setConversation}
          />
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
