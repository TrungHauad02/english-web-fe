import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Grid, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GridSerials from './GridSerials';
import { ReactMic } from 'react-mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { uploadFile } from '../../../../api/feature/uploadFile/uploadFileService';
import { createSubmitTest } from '../../../../api/test/submitTest';
import { fetchUserInfo } from '../../../../api/user/userService';
import { createSubmitTestSpeaking } from '../../../../api/test/submitTestSpeaking';
import SubmitTestSpeaking from './SubmitTestSpeaking/SubmitTestSpeaking';

export default function InterviewInstruction({ datatest, status, setStatus , setSubmitTest}) {
  const [indexSpeaking, setIndexSpeaking] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState({});
  const [submitTestQuestions, setSubmitTestQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [onDialogConfirm, setOnDialogConfirm] = useState(() => () => {});

  const currentSpeaking = datatest.testSpeakings[indexSpeaking];
  const currentQuestion = currentSpeaking?.questions[indexQuestion];

  const getSerialNumber = () => indexSpeaking * currentSpeaking.questions.length + indexQuestion + 1;

  const handleDialogClose = (shouldSave) => {
    setOpenDialog(false);
    onDialogConfirm(shouldSave);
  };

  const handleNextQuestion = () => {
    if (isRecording) {
      setOnDialogConfirm(() => (shouldSave) => {
        if (shouldSave) {
          setIsRecording(false);
        } else {
          setIsRecording(false);
        }
        if (indexQuestion < currentSpeaking.questions.length - 1) {
          setIndexQuestion(indexQuestion + 1);
        } else if (indexSpeaking < datatest?.testSpeakings.length - 1) {
          setIndexSpeaking(indexSpeaking + 1);
          setIndexQuestion(0);
        }
      });
      setOpenDialog(true);
    } else {
      if (indexQuestion < currentSpeaking.questions.length - 1) {
        setIndexQuestion(indexQuestion + 1);
      } else if (indexSpeaking < datatest?.testSpeakings.length - 1) {
        setIndexSpeaking(indexSpeaking + 1);
        setIndexQuestion(0);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (isRecording) {
      setOnDialogConfirm(() => (shouldSave) => {
        if (shouldSave) {
          setIsRecording(false);
        } else {
          setIsRecording(false);
        }
        if (indexQuestion > 0) {
          setIndexQuestion(indexQuestion - 1);
        } else if (indexSpeaking > 0) {
          setIndexSpeaking(indexSpeaking - 1);
          setIndexQuestion(datatest?.testSpeakings[indexSpeaking - 1].questions.length - 1);
        }
      });
      setOpenDialog(true);
    } else {
      if (indexQuestion > 0) {
        setIndexQuestion(indexQuestion - 1);
      } else if (indexSpeaking > 0) {
        setIndexSpeaking(indexSpeaking - 1);
        setIndexQuestion(datatest?.testSpeakings[indexSpeaking - 1].questions.length - 1);
      }
    }
  };

  const handleSerialClick = (serial) => {
    if (isRecording) {
      setOnDialogConfirm(() => (shouldSave) => {
        if (shouldSave) {
          setIsRecording(false);
        } else {
          setIsRecording(false);
        }
        let speakingIndex = 0;
        let questionIndex = 0;
        for (let i = 0; i < datatest?.testSpeakings.length; i++) {
          const speaking = datatest?.testSpeakings[i];
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
      });
      setOpenDialog(true);
    } else {
      let speakingIndex = 0;
      let questionIndex = 0;
      for (let i = 0; i < datatest?.testSpeakings.length; i++) {
        const speaking = datatest?.testSpeakings[i];
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
    }
  };

  const getListSerials = () => {
    const serials = [];
    datatest?.testSpeakings.forEach((speaking) => {
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

    if (currentRecordingIdRef.current !== null && recordedBlob && recordedBlob.blobURL) {
      setRecordings((prev) => ({
        ...prev,
        [currentRecordingIdRef.current.id]: recordedBlob,
      }));
      setSerialSet((prev) => new Set(prev).add(currentRecordingIdRef.current.serial));
    } else {
      console.error('Invalid currentRecordingIdRef or recordedBlob:', currentRecordingIdRef.current, recordedBlob);
    }
    setIsRecording(false);
  };

  const handleBtnSubmit = async () => {
    let user = await fetchUserInfo();
    const newSubmitTest = {
      id: '',
      testId: datatest.id,
      userId: user.id,
      score: 1,
      status: "ACTIVE",
      submitTime: new Date().toISOString(),
      submitTestSpeakings: []
    }


    const submitTest = await createSubmitTest(newSubmitTest);
   

    for (const testSpeaking of datatest.testSpeakings) {
      for (const question of testSpeaking.questions) {
        const convertURLToBase64 = async (url) => {
          try {
            const response = await fetch(url);
            const blob = await response.blob();
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });
          } catch (error) {
            console.error("Error fetching and converting URL to base64:", error);
            throw error;
          }
        };

        const audioBlob = recordings[question.id]?.blobURL;
        let content = "No audio available. You haven't completed this question yet.";
        if (audioBlob) {
          const base64Content = await convertURLToBase64(audioBlob);
          const result = await uploadFile(
            "test/speaking",
            question.id.replace(/\s+/g, "_") + "_" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
            base64Content
          );
          content = result.url;
        }

        let submitTestSpeakingQuestion = {
          id: '',
          testSpeakingQuestionId: question.id,
          submitTestId: submitTest.id,
          score: 1,
          content: content,
          explanation: "Sample explanation",
          comment: "tan",
          status: "ACTIVE"
        }
        newSubmitTest.submitTestSpeakings.push(submitTestSpeakingQuestion);
      }
    }
    
    setSubmitTest(newSubmitTest)
    setStatus("Submit");
  };

  const isLastQuestion = indexSpeaking === datatest?.testSpeakings.length - 1 && indexQuestion === currentSpeaking?.questions.length - 1;

  return (
    <Grid container spacing={4} sx={{ padding: '2rem' }}>
            <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          Are You Sure?
        </DialogTitle>
        <DialogContent sx={{ padding: '1.5rem' }}>
          <DialogContentText sx={{ fontSize: '1.1rem', textAlign: 'center' }}>
            Would you like to save your current recording before proceeding?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', padding: '1rem' }}>
          <Button 
            onClick={() => handleDialogClose(false)} 
            variant="outlined" 
            color="secondary"
            sx={{ borderRadius: '1rem', padding: '0.5rem 2rem' }}
          >
            No
          </Button>
          <Button 
            onClick={() => handleDialogClose(true)} 
            variant="contained" 
            color="primary"
            sx={{ borderRadius: '1rem', padding: '0.5rem 2rem' }}
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

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
                      <MicNoneIcon sx={{ fontSize: '3rem' }} />
                    </Fab>
                  </Box>
                  {currentQuestion && recordings[currentQuestion.id] && (
                    <audio controls src={recordings[currentQuestion.id].blobURL} />
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
          handleSerialClick={handleSerialClick}
          serialSet={serialSet}
          handleBtnSubmit={handleBtnSubmit}
        />
      </Grid>
    </Grid>
  );
}
