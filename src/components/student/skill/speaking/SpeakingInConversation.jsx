import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MicIcon from "@mui/icons-material/Mic";
import useSpeakingInConversation from "./useSpeakingInConversation";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import { ReactMic } from "react-mic";
import useColor from "shared/color/Color";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";
import Comment from "../writing/Comment";

export default function SpeakingInConversation() {
  const {
    listConversation,
    person,
    listPeople,
    handleChange,
    handleStartRecording,
    handleStop,
    handleResetRecording,
    isRecordingList,
    recordedAudio,
    handleSubmit,
    results,
    isScoring,
  } = useSpeakingInConversation();
  const color = useColor();

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
        {listConversation.map((conver, index) => (
          <Grid2 container key={conver.id}>
            {conver.name === person && (
              <>
                <Grid2 container direction={"row"} sx={{ width: "100%" }}>
                  <Grid2 item size={1}>
                    <Typography variant="h6">You :</Typography>
                  </Grid2>
                  <Grid2 item size={10}>
                    <Typography variant="body1">{conver.content}</Typography>
                  </Grid2>
                  <Grid2 item size={1}>
                    <Button
                      sx={{ color: "#000" }}
                      onClick={() => handleStartRecording(index)}
                    >
                      <MicIcon />
                    </Button>
                  </Grid2>
                </Grid2>
                <Stack direction={"row"} spacing={4} sx={{ width: "100%" }}>
                  <ReactMic
                    record={isRecordingList[index]}
                    onStop={(recordedBlob) => handleStop(index, recordedBlob)}
                    mimeType="audio/wav"
                    sampleRate={16000}
                    audioBitsPerSecond={128000}
                    style={{ display: "none" }}
                  />
                  {recordedAudio[index] && (
                    <Stack
                      container
                      direction={"row"}
                      alignItems={"center"}
                      spacing={4}
                      sx={{ width: "100%" }}
                    >
                      <SoundViewer audioSrc={`${recordedAudio[index]}`} />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleResetRecording(index)}
                      >
                        Reset
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </>
            )}

            {conver.name !== person && (
              <>
                <Grid2 item size={1}>
                  <Typography variant="h6">{conver.name} :</Typography>
                </Grid2>
                <Grid2 item size={11}>
                  <SoundViewer audioSrc={conver.audioUrl} />
                </Grid2>
              </>
            )}
          </Grid2>
        ))}
      </Grid2>
      <Stack justifyContent={"center"} alignItems={"flex-end"}>
        <Button
          sx={{
            color: "#fff",
            bgcolor: color.Color2_1,
            textTransform: "capitalize",
            padding: "0.5rem 1rem",
          }}
          onClick={handleSubmit}
          disabled={isScoring}
        >
          Submit
        </Button>
      </Stack>
      {isScoring && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Scoring..."></CollapsibleSection>
        </Grid2>
      )}
      {results && results.length > 0 && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Score">
            {results.map((result, index) => (
              <Stack sx={{ margin: "0.5rem 0rem" }} key={index}>
                <Comment content={"Real text: " + result.realText} />
                <Comment content={"Recognized text: " + result.transcript} />
                <Comment content={"Score: " + result.score} />
                <Divider />
              </Stack>
            ))}
          </CollapsibleSection>
        </Grid2>
      )}
    </Grid2>
  );
}
