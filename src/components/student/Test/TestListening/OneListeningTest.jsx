
import ListQuestion from '../common/ListQuestion'
import React, { useEffect } from "react";
function OneListeningTest({ oneListening, audioRef, onAudioEnd ,title,answers,setAnswers,currentAudioTime}) {
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentAudioTime;
      audioRef.current.play();
    }
  }, [oneListening]);
  return (
    <>
      <audio ref={audioRef} src={oneListening.content} onEnded={onAudioEnd} 
     />  
      <ListQuestion 
    dataTest= {oneListening} answers = {answers}
    setAnswers ={setAnswers}
    title = {title} 
    /> 
    </>
  );
}

export default OneListeningTest;
