import { useParams } from "react-router-dom";
import {
  getSpeakingDetail,
  getConversationDetail,
} from "../../../../api/teacher/detailManagerment";
import { Grid2 } from "@mui/material";
import SpeakingInfo from "./SpeakingInfo";
import { useState } from "react";
import PeopleInConversation from "./PeopleInConversation";
import Conversation from "./Conversation";

export default function SpeakingDetail() {
  const { id } = useParams();
  const data = getSpeakingDetail(id);
  const [localData, setLocalData] = useState(data);

  const fakeData = ["John", "Dutch", "Mica", "Jenny", "Linda"];
  const [people, setPeople] = useState(fakeData);

  const conversationData = getConversationDetail(1) || [];
  const [conversation, setConversation] = useState(conversationData);

  return (
    <Grid2 container direction={"row"} sx={{ margin: "2rem 4%" }}>
      <Grid2 item size={5}>
        {/** Speaking info*/}
        <SpeakingInfo data={localData} setData={setLocalData} />
      </Grid2>
      <Grid2 container size={7} direction={"column"} spacing={4}>
        <Grid2
          container
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          sx={{
            backgroundColor: "#FFF4CC",
            borderRadius: "0.5rem",
            height: "50vh",
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
          }}
        >
          <PeopleInConversation listPeople={people} setListPeople={setPeople} />
        </Grid2>
        <Grid2
          container
          boxShadow={"0 0 0.5rem 0.1rem #00000040"}
          sx={{
            backgroundColor: "#FFF4CC",
            borderRadius: "0.5rem",
            height: "72vh",
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
          }}
        >
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
