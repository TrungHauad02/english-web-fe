import { Button, Slider, Stack, Typography } from "@mui/material";
import { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
function SoundViewer({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const handleLoadedMetadata = () => {
    const audioDuration = audioRef.current.duration;
    if (!isNaN(audioDuration)) {
      setDuration(audioDuration);
    }
  };

  const handleSliderChange = (event, newValue) => {
    const seekTime = (newValue / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(newValue);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds === Infinity) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  const currentTime = audioRef.current ? audioRef.current.currentTime : 0;
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);

  return (
    <Stack
      sx={{ padding: "1rem", backgroundColor: "#F5F5F5" }}
      direction={"row"}
      spacing={2}
      alignItems={"center"}
    >
      <audio
        ref={audioRef}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
      <Button
        variant="contained"
        onClick={handlePlayPause}
        sx={{
          backgroundColor: "transparent",
          color: "#000",
          boxShadow: "none",
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
      </Button>

      <Typography sx={{ width: "8rem" }} textAlign={"center"}>
        {formattedCurrentTime} / {formattedDuration}
      </Typography>

      <Slider
        value={progress}
        onChange={handleSliderChange}
        aria-labelledby="audio-progress"
        sx={{ flexGrow: 1, color: "#221D1D" }}
      />
    </Stack>
  );
}

export default SoundViewer;
