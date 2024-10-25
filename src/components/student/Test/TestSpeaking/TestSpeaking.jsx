import MainTitle from "../MainTitle";
import React, { useState, useRef } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SpeakingTesting from "./SpeakingTesting";
import DataTestSpeaking from "./DataTestSpeaking";
import { useLocation } from 'react-router-dom';

function TestSpeaking() {
    const location = useLocation();
    const { state } = location; 
    const datatest = state;
    const title = datatest.type;
    const [status, setStatus] = useState('Testing');
    return(
        <Box>
            <MainTitle title={title} bg={"/bg_test.png"} />
            <Box sx={{marginLeft:'5%', marginRight:'5%',marginTop:'3rem'}}>
         
                <SpeakingTesting dataList={datatest.testSpeakings} status={status}/>
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
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
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
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            backgroundColor: '#f8f8f8',
        }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '2rem' }}>
                TEST YOUR MICROPHONE
            </Typography>
            <IconButton sx={{
                backgroundColor: '#fff',
                borderRadius: '50%',
                padding: '1rem',
                marginBottom: '1.5rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}>
                <MicIcon sx={{ color: '#FF5A5A', fontSize: '3rem' }} />
            </IconButton>

            <Typography sx={{ marginBottom: '1rem' }}>You have 20 seconds to speak...</Typography>
            <Typography sx={{ marginBottom: '2rem', maxWidth: '600px' }}>
                To complete this activity, you must allow access to your system's microphone. Click
                <PlayArrowIcon sx={{ fontSize: '1rem', margin: '0 4px' }} /> the button below to {isRecording ? 'Stop' : 'Start'}.
            </Typography>

            {audioUrl && (
                <Box sx={{ marginBottom: '2rem' }}>
                    <audio controls src={audioUrl}>
                        Your browser does not support the audio element.
                    </audio>
                </Box>
            )}
 
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