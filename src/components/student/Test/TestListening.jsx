import MainTitle from "./MainTitle";
import ListQuestion from "./ListQuestion"
import { Box,Typography, Button } from "@mui/material";
import SoundViewer from "../../common/soundViewer/SoundViewer";
import React, { useState ,useRef, useEffect } from 'react';
function TestListening({list,quote, title, bg}){
    const [status, setStatus] = useState('Begin');
    const audioRef = useRef(null);
    return(
        <Box>
        <MainTitle title={title} bg={bg} />
        {status === 'Begin' 
        ? <IntroduceTest setStatus={setStatus} /> 
        : <TestingListening audioRef={audioRef} status={status} setStatus={setStatus}  />}
  
      </Box>
    );
}
function IntroduceTest({ setStatus }) {

    return (
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center', 
          height: '100vh',
          textAlign: 'center',
          border: '0.2rem solid ',
          padding: '20px',
          borderRadius: '2rem',
          backgroundColor: '#f9f9f9',
          margin:'5%'
        }}
      >
        <Typography variant="h4" gutterBottom>
          Bài test 1
        </Typography>
        <Typography variant="body1" gutterBottom>
          Thời gian làm bài: 60 phút
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            backgroundColor: '#ACCD0A', 
            '&:hover': { backgroundColor: '#8CAB0A' } 
          }}
          onClick={() => setStatus('Testing')}
        >
          Bắt đầu
        </Button>
      </Box>
    );
  }
function TestingListening({ audioRef ,status,setStatus }) {
    useEffect(() => {
        if (status === 'Testing' && audioRef.current) {
            audioRef.current.play().catch((error) => {
                console.error("Audio playback failed: ", error);
            });
        }
        if (status === 'Submit' && audioRef.current) {
            audioRef.current.pause(); 
            audioRef.current.currentTime = 0; 
        }
    }, [status]);
      const handleSubmit = () => {
        setStatus('Submit'); 
      };
    return(
        <>
          <Box sx={{   background: '#FFF4CC',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    float:'right',
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

        <Box  sx={{background:'#FFF4CC',float:'center',width:'5%', marginTop:'5%' ,   marginLeft: 'auto', marginRight: 'auto', textAlign: 'center',marginBottom:'1rem',padding:'0.5rem 1rem'}}>1/10</Box>
        <Box sx={{ border: '1px solid black',
  borderRadius: '1rem',padding: '0.5rem', marginLeft:'5%',marginRight:'5%' }} >
       {status === 'Testing' 
  ? <audio ref={audioRef} src="/fileListening.mp3" autoPlay style={{ display: 'none' }} /> 
  : <Box>
    <audio ref={audioRef} src="/fileListening.mp3" controls style={{ width: '100%',marginTop:'1rem' }} />
    <Typography variant="h10"sx={{color:'#49B3D5'}} >
        Show transcript
    </Typography>
    </Box>}

       
             <ListQuestion/>
      
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center',marginTop:'1rem' }}>
        <Button 
            sx={{
            border: '0.0001rem solid black',
            borderRadius: '1rem',
            background: '#FFD984',
            color: 'black',
            textAlign: 'center',
            marginBottom: '2%',
            padding: '1rem 2rem'
            }}
            onClick={handleSubmit}
        >
            SUBMIT
        </Button>
        </Box> 
        </>
    );

}
export default TestListening;