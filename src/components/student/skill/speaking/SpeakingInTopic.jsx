import { useEffect, useRef, useState } from "react";
import { Button, Grid2, Stack, Typography } from "@mui/material";
import { ReactMic } from "react-mic";
import MicIcon from "@mui/icons-material/Mic";
import BasicButton from "../../../common/button/BasicButton";
import SoundViewer from "../../../common/soundViewer/SoundViewer";

const speaking = {
  content:
    "The best way to travel is in a group led by a tour guide. Do you agree or disagree with this statement?",
  timeLimit: 120,
};

export default function SpeakingInTopic() {
  const [hasMicPermission, setHasMicPermission] = useState(false);
  const [permissionChecked, setPermissionChecked] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);
  const [timer, setTimer] = useState(speaking.timeLimit);
  const timerRef = useRef(null);

  const handleStartRecording = () => {
    setIsRecording((prevState) => !prevState);
    if (!isRecording) {
      timerRef.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 1) return prevTimer - 1;
          clearInterval(timerRef.current);
          handleStopRecording();
          return 0;
        });
      }, 1000);
    } else {
      handleStopRecording();
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    clearInterval(timerRef.current);
    setTimer(speaking.timeLimit);
  };

  const handleStop = (recordedBlob) => {
    const audioURL = URL.createObjectURL(recordedBlob.blob);
    setAudioSrc(audioURL);
  };

  const handleClearAudio = () => {
    setAudioSrc(null);
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setHasMicPermission(true); // Đã có quyền
      })
      .catch(() => {
        setHasMicPermission(false); // Không có quyền
      })
      .finally(() => {
        setPermissionChecked(true); // Đã kiểm tra quyền
      });
  }, []);

  return (
    <Grid2 container alignItems={"center"} direction={"column"} spacing={2}>
      <Grid2 item xs={12}>
        <Typography variant="h6" fontWeight={"bold"}>
          SPEAKING IN TOPIC
        </Typography>
      </Grid2>
      <Grid2 item xs={12} sx={{ width: "100%" }}>
        <Typography variant="body1" textAlign={"left"} fontWeight={"bold"}>
          Topic: {speaking.content}
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
            backgroundColor="#AFCC2B"
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
                backgroundColor: "#CDE556",
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
              backgroundColor: "#ACCD0A",
              borderRadius: "0rem",
              paddingX: "2rem",
            }}
          >
            Submit
          </BasicButton>
        </Stack>
      </Grid2>
    </Grid2>
  );
}