import { Button, Grid2, Stack, Typography } from "@mui/material";
import { ReactMic } from "react-mic";
import MicIcon from "@mui/icons-material/Mic";
import BasicButton from "shared/component/button/BasicButton";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import useSpeakingTopic from "./useSpeakingTopic";

export default function SpeakingInTopic() {
  const {
    speaking,
    hasMicPermission,
    permissionChecked,
    isRecording,
    audioSrc,
    timer,
    handleStartRecording,
    handleStop,
    handleClearAudio,
  } = useSpeakingTopic();
  if (!speaking) return;
  return (
    <Grid2 container alignItems={"center"} direction={"column"} spacing={2}>
      <Grid2 item xs={12}>
        <Typography variant="h6" fontWeight={"bold"}>
          SPEAKING IN TOPIC
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sx={{ width: "100%" }}>
        <Typography variant="body1" textAlign={"left"} fontWeight={"bold"}>
          Topic: {speaking.topic}
        </Typography>
      </Grid2>

      {permissionChecked && !hasMicPermission && (
        <Grid2 item xs={12} sx={{ width: "100%" }}>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontWeight={"bold"}
            color="red"
          >
            To complete this activity, you must allow access to your system's
            microphone. Click the accept button above to start.
          </Typography>
        </Grid2>
      )}

      {hasMicPermission && (
        <>
          <Grid2 item xs={12} sx={{ width: "100%", textAlign: "center" }}>
            <Button
              sx={{
                color: "#FE2360",
                backgroundColor: "#fff",
                borderRadius: "999px",
                paddingY: "1rem",
              }}
              onClick={handleStartRecording}
            >
              <MicIcon />
            </Button>
          </Grid2>
          <Grid2 item xs={12} sx={{ width: "100%" }}>
            <Typography
              variant="body1"
              textAlign={"center"}
              fontWeight={"bold"}
            >
              You have {timer} seconds to speak…
            </Typography>
          </Grid2>
          <ReactMic
            record={isRecording}
            className="sound-wave"
            onStop={handleStop}
            strokeColor="#fff"
            backgroundColor="#6EC2F7"
          />
          {audioSrc && (
            <Grid2 item xs={12} sx={{ width: "100%" }}>
              <SoundViewer audioSrc={audioSrc} />{" "}
            </Grid2>
          )}
          <Grid2 item xs={12} sx={{ width: "100%" }}>
            <Typography
              variant="body1"
              textAlign={"center"}
              fontWeight={"bold"}
            >
              {isRecording
                ? "Recording... Click the microphone button again to stop."
                : "Click the microphone button above to start recording."}
            </Typography>
          </Grid2>
        </>
      )}

      <Grid2 item xs={12} sx={{ width: "100%", textAlign: "right" }}>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          {audioSrc && (
            <BasicButton
              sx={{
                color: "#fff",
                backgroundColor: "#6EC2F7",
                borderRadius: "0rem",
                paddingX: "2rem",
              }}
              onClick={handleClearAudio}
              content="Clear"
            ></BasicButton>
          )}
          <BasicButton
            sx={{
              color: "#fff",
              backgroundColor: "#6EC2F7",
              borderRadius: "0rem",
              paddingX: "2rem",
              textTransform: "capitalize",
            }}
          >
            Submit
          </BasicButton>
        </Stack>
      </Grid2>
    </Grid2>
  );
}
