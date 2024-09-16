import MainTitle from "./MainTitle";
import React ,{useState} from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';



function TestSpeaking({list,quote, title, bg}){
    return(
        <Box>
        <MainTitle title="Speaking" bg={bg} />
        <Box sx={{marginLeft:'5%',marginRight:'5%'}}>
        <Box sx={{display: 'flex', justifyContent: 'center',marginTop:'1rem',marginBottom:'1rem'}}>
        <Box sx={{   background: '#FFF4CC',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    float:'center',
                    marginRight: '5%',
                    width:'10%',
                    padding:'0.5rem 1rem'
                    }}>
            <Typography align="center">
            <strong>Time remaining:</strong>
            <br />
            60:00
            </Typography>
        </Box>
        </Box>
        <MicrophoneTest/>
        </Box>
        
        </Box>
    );
}

function MicrophoneTest() {
    const [isRecording, setIsRecording] = useState(false);
  
    const handleButtonClick = () => {
      setIsRecording(!isRecording);
   
      if (isRecording) {
   
      } else {
       
   
      }
    };
  
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
          backgroundColor: '#f8f8f8',
        }}
      >

        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
          TEST YOUR MICROPHONE
        </Typography>
        <IconButton
          sx={{
            backgroundColor: '#fff',
            borderRadius: '50%',
            padding: '1rem',
            marginBottom: '1.5rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
          }}
        >
          <MicIcon sx={{ color: '#FF5A5A', fontSize: '3rem' }} />
        </IconButton>
  
        <Typography sx={{ marginBottom: '1rem' }}>You have 20 seconds to speak...</Typography>
        <Typography sx={{ marginBottom: '2rem', maxWidth: '600px' }}>
          To complete this activity, you must allow access to your system's microphone. Click
          <PlayArrowIcon sx={{ fontSize: '1rem', margin: '0 4px' }} /> the button below to {isRecording ? 'Stop' : 'Start'}.
        </Typography>
 
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FF5A5A',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
            }}
            startIcon={isRecording ? <StopIcon /> : <PlayArrowIcon />}
            onClick={handleButtonClick}
          >
            {isRecording ? 'Stop' : 'Test microphone'}
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#5AAEFF',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
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