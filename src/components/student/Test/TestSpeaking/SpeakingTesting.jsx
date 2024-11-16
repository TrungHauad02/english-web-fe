import React, { useState,useEffect,useRef } from 'react';
import { Box, Typography, Button, Grid, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MicIcon from '@mui/icons-material/Mic';
import GridSerials from './GridSerials';
import { ReactMic } from 'react-mic'; 
import MicNoneIcon from '@mui/icons-material/MicNone';

export default function InterviewInstruction({ dataList, status }) {
  const [indexSpeaking, setIndexSpeaking] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState({}); 
  

  const currentSpeaking = dataList[indexSpeaking];
  const currentQuestion = currentSpeaking?.questions[indexQuestion];

  const getSerialNumber = () => indexSpeaking * currentSpeaking.questions.length + indexQuestion + 1;

  const handleNextQuestion = () => {
    if (isRecording) {
      const shouldSave = window.confirm('Bạn có muốn lưu bản ghi âm hiện tại không?');
      if (shouldSave) {
        // Lưu lại bản ghi âm nếu người dùng đồng ý
        setIsRecording(false);
      } else {
        // Không lưu bản ghi âm
        setIsRecording(false);
      }
    }
  
    if (indexQuestion < currentSpeaking.questions.length - 1) {
      setIndexQuestion(indexQuestion + 1);
    } else if (indexSpeaking < dataList.length - 1) {
      setIndexSpeaking(indexSpeaking + 1);
      setIndexQuestion(0);
    }
  };
  
  const handlePreviousQuestion = () => {
    if (isRecording) {
      const shouldSave = window.confirm('Bạn có muốn lưu bản ghi âm hiện tại không?');
      if (shouldSave) {
        // Lưu lại bản ghi âm nếu người dùng đồng ý
        setIsRecording(false);
      } else {
        // Không lưu bản ghi âm
        setIsRecording(false);
      }
    }
  
    if (indexQuestion > 0) {
      setIndexQuestion(indexQuestion - 1);
    } else if (indexSpeaking > 0) {
      setIndexSpeaking(indexSpeaking - 1);
      setIndexQuestion(dataList[indexSpeaking - 1].questions.length - 1);
    }
  };
  
  const handleSerialClick = (serial) => {
    if (isRecording) {
      const shouldSave = window.confirm('Bạn có muốn lưu bản ghi âm hiện tại không?');
      if (shouldSave) {
        // Lưu lại bản ghi âm nếu người dùng đồng ý
        setIsRecording(false);
      } else {
        // Không lưu bản ghi âm
        setIsRecording(false);
      }
    }
  
    let speakingIndex = 0;
    let questionIndex = 0;
  
    for (let i = 0; i < dataList.length; i++) {
      const speaking = dataList[i];
      for (let j = 0; j < speaking.questions.length; j++) {
        if (speaking.questions[j].serial === serial) {
          speakingIndex = i;
          questionIndex = j;
          break;
        }
      }
    }
  
    setIndexSpeaking(speakingIndex);
    setIndexQuestion(questionIndex);
  };
  

  const getListSerials = () => {
    const serials = [];
    dataList.forEach((speaking) => {
      if (speaking && speaking.questions) {
        speaking.questions.forEach((question) => {
          serials.push(question.serial);
        });
      }
    });
    return serials;
  };

  const currentRecordingIdRef = useRef(null);
  const [serialSet, setSerialSet] = useState(new Set());
  const handleStartRecording = () => {

    currentRecordingIdRef.current = {
      id: currentQuestion.id,
      serial: currentQuestion.serial,
    };
    
    setIsRecording(true);
  
   
  };
  
  const handleStopRecording = (recordedBlob) => {
    console.log('Stop recording', recordedBlob);
   
    if (currentRecordingIdRef.current !== null && recordedBlob && recordedBlob.blobURL) {
      setRecordings((prev) => ({
        ...prev,
        [currentRecordingIdRef.current.id]: recordedBlob.blobURL, // Dùng giá trị từ ref
      }));
      setSerialSet((prev) => new Set(prev).add(currentRecordingIdRef.current.serial));
    } else {
      console.error('Invalid currentRecordingIdRef or recordedBlob:', currentRecordingIdRef.current, recordedBlob);
    }
    setIsRecording(false);
 
  };
  useEffect(() => {
    console.log('Recordings state updated:', recordings);
  }, [recordings]);
  

  const isLastQuestion =
    indexSpeaking === dataList.length - 1 && indexQuestion === currentSpeaking?.questions.length - 1;

  return (
    <Grid container spacing={4} sx={{ padding: '2rem' }}>
      <Grid item xs={12} md={9}>
        <Box
          sx={{
            padding: '2rem',
            borderRadius: '8px',
            backgroundColor: '#f5f5f5',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {currentSpeaking?.title || 'No Title'}
            </Typography>
          </Box>

          <Box
            sx={{
              textAlign: 'center',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {currentQuestion ? (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                  Question {getSerialNumber()}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: '1.5rem' }}>
                  {currentQuestion.content}
                </Typography>
                <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    <ReactMic
                      record={isRecording}
                      onStop={handleStopRecording}
                      strokeColor="#000000"
                      backgroundColor="#f5f5f5"
                    />
                    <Fab
                      color={isRecording ? "secondary" : "error"}
                      aria-label="mic"
                      onClick={() => {
                        if (!isRecording) {
                          handleStartRecording(); // Gọi hàm này khi bắt đầu ghi âm
                        } else {
                          setIsRecording(false);
                        }
                      }}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      }}
                    >
                      <MicNoneIcon sx={{ fontSize: '3rem' }} />
                    </Fab>
                  </Box>
                  {currentQuestion && recordings[currentQuestion.id] && (
                      <audio controls src={recordings[currentQuestion.id]} />
                    )}


              </>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
                  {currentSpeaking?.title || 'No Question Selected'}
                </Typography>
                <Typography variant="h6">{currentSpeaking?.description}</Typography>
              </>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem' }}>
              <Button
                variant="contained"
                startIcon={<ArrowBackIcon />}
                onClick={handlePreviousQuestion}
                disabled={indexSpeaking === 0 && indexQuestion === 0}
                sx={{
                  borderRadius: '1rem',
                  padding: '0.8rem 2rem',
                  backgroundColor: '#007bff',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                onClick={handleNextQuestion}
                disabled={isLastQuestion}
                sx={{
                  borderRadius: '1rem',
                  padding: '0.8rem 2rem',
                  backgroundColor: isLastQuestion ? '#ccc' : '#007bff',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: isLastQuestion ? '#ccc' : '#0056b3',
                  },
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} md={3}>
        <GridSerials
          serials={getListSerials()}
          status={status}
          key={indexSpeaking + '-' + indexQuestion}
          onItemClick={handleSerialClick}
          serialSet = {serialSet}
        />
      </Grid>
    </Grid>
  );
}
