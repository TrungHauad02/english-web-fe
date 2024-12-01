import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl ,Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ListQuestion from './common/ListQuestion'

function OneListeningTest({ onelistening, audioRef, handlebtnSubmit, onAudioEnd ,title,answers,setAnswers}) {
  return (
    <>
      <audio ref={audioRef} src={onelistening.content} onEnded={onAudioEnd} autoPlay  
     />  
      <ListQuestion 
    dataTest= {onelistening} answers = {answers}
    setAnswers ={setAnswers}
    title = {title} 
    /> 
    </>
  );
}

export default OneListeningTest;
