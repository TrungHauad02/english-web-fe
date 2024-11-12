import { Stack } from "@mui/material";
import SpeakingInConversation from "./SpeakingInConversation";
import SpeakingInTopic from "./SpeakingInTopic";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";

export default function PracticeSpeaking() {

  return (
    <Stack sx={{ marginX: "4%", marginY: "1rem", borderRadius: "10px"}}>
      <CollapsibleSection buttonText="Speaking in a conversation">
        <Stack sx={{padding: "1rem 2%", bgcolor:"#d9d9d9" }}>
          <Stack sx={{ padding: "1rem 2%", bgcolor:"#fff" }}>
            <SpeakingInConversation />
          </Stack>
        </Stack>
      </CollapsibleSection>

      <CollapsibleSection buttonText="Speaking in topic">
      
        <Stack sx={{padding: "1rem 2%", bgcolor:"#d9d9d9" }}>
          <Stack sx={{ padding: "1rem 2%", bgcolor:"#fff" }}>
            <SpeakingInTopic />
          </Stack>
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}
