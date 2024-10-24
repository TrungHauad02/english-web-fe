import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl ,Button } from '@mui/material';
import { useEffect, useState } from 'react';
import ListQuestion from './common/ListQuestion'

function OneListeningTest({ onelistening, audioRef, status, onAudioEnd ,title,focusId}) {

  const [showTranscript, setShowTranscript] = useState(false);
  const handleClick = () => {
    setShowTranscript(!showTranscript); 
  };

  return (
    <>
    {
      console.log(onelistening.content+onelistening.id)
      
    }
      {status === 'Testing' 
        ? <audio ref={audioRef} src={onelistening.content} onEnded={onAudioEnd} autoPlay style={{ display: 'none' }} /> 
        
        : <Box>
            <audio ref={audioRef} src={onelistening.content} controls style={{ width: '100%', marginTop: '1rem' }} />
            <Button
            onClick={handleClick}
            sx={{ display: 'flex', alignItems: 'center', marginTop: '0.5rem', padding: '0.5rem' }}
            variant="text" 
          >
            <Typography variant="body2" sx={{ color: '#49B3D5', marginRight: '0.5rem' }}>
              Show transcript
            </Typography>
            <img src="/icontranscript.png" alt="Transcript Icon" style={{ width: '1rem', height: '1rem' }} />
          </Button>
          {showTranscript && (
        <Typography variant="body2" sx={{ marginTop: '0.5rem', color: '#000' ,padding: '0.5rem' }}>
          Đây là nội dung của transcript!
        </Typography>
      )}
          </Box>
      }
      <ListQuestion status={status} dataTest={onelistening}
      title = {title} focusId={focusId}   />
    </>
  );
}

export default OneListeningTest;
