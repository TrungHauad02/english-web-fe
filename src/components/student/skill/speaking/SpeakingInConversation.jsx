import { Button, Grid2, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MicIcon from "@mui/icons-material/Mic";
import useSpeakingInConversation from "./useSpeakingInConversation";

export default function SpeakingInConversation() {
  const { listConversation, person, listPeople, handleChange } =
    useSpeakingInConversation();

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
            {listPeople.map((person) => (
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
        {listConversation.map((conver) => (
          <Grid2 container key={conver.id}>
            {conver.name === person && (
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

            {conver.name !== person && (
              <>
                <Grid2 item size={1}>
                  <Typography variant="h6">{conver.name} :</Typography>
                </Grid2>
                <Grid2 item size={11}>
                  <Typography variant="body1">{conver.content}</Typography>
                </Grid2>
              </>
            )}
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}
