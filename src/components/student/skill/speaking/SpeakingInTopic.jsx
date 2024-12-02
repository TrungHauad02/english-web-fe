import { Button, Grid2, Stack, Typography, Box } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import BasicButton from "shared/component/button/BasicButton";
import useSpeakingTopic from "./useSpeakingTopic";
import useColor from "shared/color/Color";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";
import Comment from "../writing/Comment";

export default function SpeakingInTopic() {
  const {
    speaking,
    isRecording,
    timer,
    textRecognize,
    comment,
    score,
    isScoring,
    permission,
    recordingStatus,
    audio,
    handleClearAudio,
    handleSubmit,
    startRecording,
    stopRecording,
    getMicrophonePermission,
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
      {!permission ? (
        <Button
          onClick={getMicrophonePermission}
          variant="contained"
          sx={{ textTransform: "none" }}
        >
          Get Microphone
        </Button>
      ) : null}

      {!permission && (
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

      {permission && (
        <>
          <Grid2 item xs={12} sx={{ width: "100%", textAlign: "center" }}>
            <Button
              sx={{
                color: "#FE2360",
                backgroundColor: "#fff",
                borderRadius: "999px",
                paddingY: "1rem",
              }}
              onClick={
                recordingStatus === "inactive" ? startRecording : stopRecording
              }
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
          {audio && <audio src={audio} controls style={{ width: "100%" }} />}
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
          {audio && (
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
            disabled={isScoring || !audio}
          >
            Submit
          </BasicButton>
        </Stack>
      </Grid2>
      {isScoring && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Scoring..."></CollapsibleSection>
        </Grid2>
      )}
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
