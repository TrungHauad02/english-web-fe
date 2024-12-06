import MainTitle from "../MainTitle";
import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SpeakingTesting from "./SpeakingTesting";
import { getTest } from "api/test/TestApi";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import SubmitTestSpeaking from "./SubmitTestSpeaking/SubmitTestSpeaking";

import CountdownTimer from "../common/CountdownTimer";



function TestSpeaking() {
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [submitTest, setSubmitTest] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setSCore] = useState(null);
  const title = datatest ? datatest.type : "";
  const [version, setVersion] = useState(0);

  const [status, setStatus] = useState("Testing");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data =  await getTest(state.id,"ACTIVE");
        if (data) {
          const updateDataTest = (data) => {
            let serialCounter = 1; 
            data.testSpeakings = data.testSpeakings.map((item) => ({
              ...item,
              questions: item.questions.map((question) =>
                question.serial !== undefined
                  ? { ...question, serial: serialCounter++ }
                  : question
              ),
            }));
            return data;
          };
  
          const updatedData = updateDataTest(data);
     
          setdatatest(updatedData);
          setStoreName("MyStore" + data.id)
        } else {
          setdatatest(null);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const onClickTestAgain = () => {
    setVersion(version + 1);
    setStatus("Testing");
  };

  return (
    <Box>
      <MainTitle
        title={title}
        bg={
          "https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
        }
      />
      <Box sx={{marginLeft: "5%", marginRight: "5%",marginBottom:'1rem'}}>      
      <Box sx={{  marginTop: "1rem" }}>
          <SpeakingTesting
            key={version}
            datatest={datatest}
            status={status}
            setStatus={setStatus}
            setSubmitTest={setSubmitTest}
          />

      </Box>
    </Box>
    </Box>
  );
}

function MicrophoneTest() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleButtonClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", marginBottom: "2rem" }}
      >
        TEST YOUR MICROPHONE
      </Typography>
      <IconButton
        sx={{
          backgroundColor: "#fff",
          borderRadius: "50%",
          padding: "1rem",
          marginBottom: "1.5rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <MicIcon sx={{ color: "#FF5A5A", fontSize: "3rem" }} />
      </IconButton>

      <Typography sx={{ marginBottom: "1rem" }}>
        You have 20 seconds to speak...
      </Typography>
      <Typography sx={{ marginBottom: "2rem", maxWidth: "600px" }}>
        To complete this activity, you must allow access to your system's
        microphone. Click
        <PlayArrowIcon sx={{ fontSize: "1rem", margin: "0 4px" }} /> the button
        below to {isRecording ? "Stop" : "Start"}.
      </Typography>

      {audioUrl && (
        <Box sx={{ marginBottom: "2rem" }}>
          <audio controls src={audioUrl}>
            Your browser does not support the audio element.
          </audio>
        </Box>
      )}

      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#FF5A5A",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
          startIcon={isRecording ? <StopIcon /> : <PlayArrowIcon />}
          onClick={handleButtonClick}
        >
          {isRecording ? "Stop" : "Test microphone"}
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#5AAEFF",
            color: "#fff",
            padding: "0.75rem 2rem",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
          }}
          endIcon={<SkipNextIcon />}
        >
          Skip
        </Button>
      </Box>
    </Box>
  );
}

export default TestSpeaking;
