import { Button, Grid2, Typography } from "@mui/material";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MicIcon from "@mui/icons-material/Mic";
import TextToSpeechViewer from "shared/component/soundViewer/TextToSpeechViewer";
import { listConversation } from "./ListConversation";

export default function SpeakingInConversation() {
  const persons = [...new Set(listConversation.map((conver) => conver.person))];
  const [person, setPerson] = useState(persons[0]);

  const handleChange = (event) => {
    setPerson(event.target.value);
  };
  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Grid2 container direction={"row"} spacing={6} alignItems={"center"}>
        <Typography variant="h6">Choose the person you wanna be: </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={person}
            onChange={handleChange}
            sx={{ flexDirection: "row" }}
          >
            {persons.map((person) => (
              <FormControlLabel
                key={person}
                value={person}
                control={<Radio />}
                label={person}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid2>
      <Grid2 container direction={"column"} spacing={2}>
        {listConversation
          .sort((a, b) => a.serial - b.serial)
          .map((conver) => (
            <Grid2 container key={conver.id}>
              {conver.person === person && (
                <>
                  <Grid2 item size={1}>
                    <Typography variant="h6">You :</Typography>
                  </Grid2>
                  <Grid2 item size={10}>
                    <Typography variant="body1">{conver.content}</Typography>
                  </Grid2>
                  <Grid2 item size={1}>
                    <Button sx={{ color: "#000" }}>
                      <MicIcon />
                    </Button>
                  </Grid2>
                </>
              )}

              {conver.person !== person && (
                <>
                  <Grid2 item size={1}>
                    <Typography variant="h6">{conver.person} :</Typography>
                  </Grid2>
                  <Grid2 item size={11}>
                    <TextToSpeechViewer text={conver.content} />
                  </Grid2>
                </>
              )}
            </Grid2>
          ))}
      </Grid2>
    </Grid2>
  );
}
