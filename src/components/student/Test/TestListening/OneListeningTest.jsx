
import ListQuestion from '../common/ListQuestion'
import React, { useEffect } from "react";
import { Box } from "@mui/material";
function OneListeningTest({ oneListening, audioRef, onAudioEnd ,title,answers,setAnswers,currentAudioTime}) {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentAudioTime;
      audioRef.current.play();
    }
  }, [oneListening]);
  return (
    <>
    <Box
      sx={{
        maxHeight: '400px', 
        overflowY: 'auto',
        padding: '1rem',
      }}
    >
      <audio ref={audioRef} src={oneListening.content} onEnded={onAudioEnd} />
      <ListQuestion
        dataTest={oneListening}
        answers={answers}
        setAnswers={setAnswers}
        title={title}
      />
    </Box>
    </>
  )
}

export default OneListeningTest;
