import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl ,Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ListQuestionSubmit from '../common/ListQuestionSubmit'

function OneListeningTest({ onelistening, dataSubmitTest  }) {
  return (
    <>
     <Box sx={{  padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <audio src="/testlistening1.mp3" controls style={{ width: '100%' }} />
    </Box>
      <ListQuestionSubmit 
    dataTest= {onelistening.questions}   
    dataSubmitTest= {dataSubmitTest} 
    /> 
    </>
  );
}

export default OneListeningTest;
