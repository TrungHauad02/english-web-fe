import { Stack } from "@mui/material";
import ListenAndWriteWord from "./ListenAndWriteWord";
import ListenAndAnswerQuestion from "./ListenAndAnswerQuestion";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";

function PracticeListening() {
  return (
    <Stack>
      <CollapsibleSection buttonText="Listen and write the word">
        <Stack sx={{padding: "1rem 2%", bgcolor:"#d9d9d9" }}>
          <Stack sx={{ padding: "1rem 2%", bgcolor:"#fff" }}>
            <ListenAndWriteWord />
          </Stack>
        </Stack>
      </CollapsibleSection>
      
      <CollapsibleSection buttonText="Listen and answer question">
        <Stack sx={{padding: "1rem 2%", bgcolor:"#d9d9d9" }}>
          <ListenAndAnswerQuestion />
        </Stack>
      </CollapsibleSection>
    </Stack>
  );
}

export default PracticeListening;
