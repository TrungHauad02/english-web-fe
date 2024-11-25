import { Button, Grid2, Stack, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MicIcon from "@mui/icons-material/Mic";
import useSpeakingInConversation from "./useSpeakingInConversation";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import { ReactMic } from "react-mic";
import useColor from "shared/color/Color";

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
                      onClick={() => handleStartRecording(conver.id)}
                    >
                      <MicIcon />
                    </Button>
                  </Grid2>
                </Grid2>
                <Stack direction={"row"} spacing={4} sx={{ width: "100%" }}>
                  <ReactMic
                    record={isRecordingList[index]}
                    className="sound-wave"
                    onStop={(recordedBlob) =>
                      handleStop(conver.id, recordedBlob)
                    }
                    strokeColor="#fff"
                    backgroundColor={color.Color2}
                    mimeType="audio/wav"
                    sampleRate={16000}
                    audioBitsPerSecond={128000}
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
                        onClick={() => handleResetRecording(conver.id)}
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
        >
          Submit
        </Button>
      </Stack>
    </Grid2>
  );
}
