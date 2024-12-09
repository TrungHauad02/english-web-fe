import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Fab, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ReactMic } from 'react-mic';

const SpeakingTest = ({ dataTest, focusId,answers,setAnswers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentTitle, setCurrentTitle] = useState('');
  const [currentSpeakingIndex, setCurrentSpeakingIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState(answers || {});

  useEffect(() => {
    if (dataTest && dataTest.length > 0) {
      let foundQuestion = null;
      let speakingIndex = 0;
      let questionIndex = 0;

      for (let i = 0; i < dataTest.length; i++) {
        const speaking = dataTest[i];
        for (let j = 0; j < speaking.questions.length; j++) {
          if (speaking.questions[j].serial === focusId) {
            foundQuestion = speaking.questions[j];
            speakingIndex = i;
            questionIndex = j;
            break;
          }
        }
        if (foundQuestion) break;
      }

      if (foundQuestion) {
        setCurrentQuestion(foundQuestion);
        setCurrentTitle(dataTest[speakingIndex].title);
        setCurrentIndex(questionIndex);
        setCurrentSpeakingIndex(speakingIndex);
      } else {
        setCurrentQuestion(dataTest[0].questions[0]);
        setCurrentTitle(dataTest[0].title);
        setCurrentSpeakingIndex(0);
        setCurrentIndex(0);
      }
    }
  }, [dataTest, focusId]);
  const currentRecordingIdRef = useRef(null);
  const handleStartRecording = () => {
    currentRecordingIdRef.current = {
      id: currentQuestion.id,
      serial: currentQuestion.serial,
    };
    setIsRecording(true);
  };
  useEffect(() => {
    setRecordings(answers);
  }, [answers]);

  const handleStopRecording = (recordedBlob) => {
    if (recordedBlob) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = `data:audio/wav;base64,${reader.result.split(',')[1]}`;
            setRecordings((prev) => ({
                ...prev,
                [currentRecordingIdRef.current.id]: base64Data,
            }));
            setAnswers((prev) => ({
                ...prev,
                [currentRecordingIdRef.current.id]: base64Data,
            }));
        };
        reader.readAsDataURL(recordedBlob.blob);
    }
    setIsRecording(false);
};


  const handleNext = () => {
    if (currentIndex < dataTest[currentSpeakingIndex].questions.length - 1) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        setCurrentQuestion(dataTest[currentSpeakingIndex].questions[newIndex]);
        return newIndex;
      });
    } else if (currentSpeakingIndex < dataTest.length - 1) {
      setCurrentSpeakingIndex((prevIndex) => {
        const newSpeakingIndex = prevIndex + 1;
        setCurrentQuestion(dataTest[newSpeakingIndex].questions[0]);
        setCurrentTitle(dataTest[newSpeakingIndex].title);
        setCurrentIndex(0);
        return newSpeakingIndex;
      });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex - 1;
        setCurrentQuestion(dataTest[currentSpeakingIndex].questions[newIndex]);
        return newIndex;
      });
    } else if (currentSpeakingIndex > 0) {
      setCurrentSpeakingIndex((prevIndex) => {
        const newSpeakingIndex = prevIndex - 1;
        const lastQuestionIndex = dataTest[newSpeakingIndex].questions.length - 1;
        setCurrentQuestion(dataTest[newSpeakingIndex].questions[lastQuestionIndex]);
        setCurrentTitle(dataTest[newSpeakingIndex].title);
        setCurrentIndex(lastQuestionIndex);
        return newSpeakingIndex;
      });
    }
  };

  return (
    <Box
      sx={{
        padding: '2rem',
        borderRadius: '8px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
      }}
    >
      <Box sx={{ textAlign: 'left', marginBottom: '1rem' }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#333',
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            display: 'inline-block',
          }}
        >
          {currentTitle}
        </Typography>
      </Box>
      <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
        {currentQuestion ? `Question ${currentQuestion.serial}` : 'No Question Selected'}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '1.5rem' }}>
        {currentQuestion?.content}
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
                          handleStartRecording();
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
                      <MicIcon sx={{ fontSize: '3rem' }} />
                    </Fab>
                  </Box>
      {currentQuestion && recordings[currentQuestion.id] && (
       <audio
       controls
       preload="auto" 
       src={recordings[currentQuestion.id]}
     />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem' }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentSpeakingIndex === 0 && currentIndex === 0}
          sx={{
            borderRadius: '1rem',
            padding: '0.8rem 2rem',
            backgroundColor: currentSpeakingIndex === 0 && currentIndex === 0 ? '#ccc' : '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor: currentSpeakingIndex === 0 && currentIndex === 0 ? '#ccc' : '#0056b3',
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          disabled={
            currentSpeakingIndex === dataTest.length - 1 &&
            currentIndex === dataTest[currentSpeakingIndex].questions.length - 1
          }
          sx={{
            borderRadius: '1rem',
            padding: '0.8rem 2rem',
            backgroundColor:
              currentSpeakingIndex === dataTest.length - 1 &&
              currentIndex === dataTest[currentSpeakingIndex].questions.length - 1
                ? '#ccc'
                : '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor:
                currentSpeakingIndex === dataTest.length - 1 &&
                currentIndex === dataTest[currentSpeakingIndex].questions.length - 1
                  ? '#ccc'
                  : '#0056b3',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};



export default SpeakingTest;
