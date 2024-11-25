import { Button, Grid2, Stack, Typography, Box } from "@mui/material";
import { ReactMic } from "react-mic";
import MicIcon from "@mui/icons-material/Mic";
import BasicButton from "shared/component/button/BasicButton";
import SoundViewer from "shared/component/soundViewer/SoundViewer";
import useSpeakingTopic from "./useSpeakingTopic";
import useColor from "shared/color/Color";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";
import Comment from "../writing/Comment";

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
    handleSubmit,
    textRecognize,
    comment,
    score,
  } = useSpeakingTopic();

  const color = useColor();

  if (!speaking) return;
  return (
    <Grid2
      container
      alignItems={"center"}
      direction={"column"}
      spacing={2}
      sx={{ paddingRight: "1rem" }}
    >
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
            mimeType="audio/wav"
            backgroundColor={color.Color2}
            sampleRate={16000}
            audioBitsPerSecond={128000}
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

      <Grid2
        item
        xs={12}
        sx={{ width: "100%", textAlign: "right", marginRight: "2rem" }}
      >
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          {audioSrc && (
            <BasicButton
              sx={{
                color: "#fff",
                backgroundColor: color.Color2_1,
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
              backgroundColor: color.Color2_1,
              borderRadius: "0rem",
              paddingX: "2rem",
              textTransform: "capitalize",
            }}
            onClick={handleSubmit}
          >
            Submit
          </BasicButton>
        </Stack>
      </Grid2>
      {textRecognize && (
        <Stack
          sx={{
            margin: "1rem 2rem 1rem 1rem",
            boxShadow: "5px 5px 5px #d9d9d9",
            borderRadius: "0.5rem",
            width: "100%",
          }}
        >
          <Box sx={{ padding: "1rem", bgcolor: "#f1f1f1" }}>
            <Typography variant="h6">Text recognize:</Typography>
            <Box sx={{ padding: "1rem", bgcolor: "#fff", marginTop: "1rem" }}>
              <Typography variant="body1">{textRecognize}</Typography>
            </Box>
          </Box>
        </Stack>
      )}
      {score && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Score">
            <Comment content={"Score: " + score} />
          </CollapsibleSection>
        </Grid2>
      )}
      {comment && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Comments">
            <Comment content={"Comment: " + comment} />
          </CollapsibleSection>
        </Grid2>
      )}
    </Grid2>
  );
}
