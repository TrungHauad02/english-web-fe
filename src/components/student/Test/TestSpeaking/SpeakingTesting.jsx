import React, { useState, useRef,useEffect } from 'react';
import { Box, Typography, Button, Grid, Fab, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, duration } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import GridSerials from './GridSerials';
import { ReactMic } from 'react-mic';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { uploadFile } from '../../../../api/feature/uploadFile/uploadFileService';
import { createSubmitTest } from '../../../../api/test/submitTest';
import { fetchUserInfo } from '../../../../api/user/userService';
import { createSubmitTestSpeaking } from '../../../../api/test/submitTestSpeaking';
import { openDB, saveData, getData, deleteData } from '../common/IndexDB';
import { scoreTestWriting } from "api/feature/scoreTestWriting/scoreTestWriting";
import { getSpeechToText } from "api/feature/stt/SpeechToTextService";
import { styled } from "@mui/material/styles";
import { useLocation,useNavigate } from "react-router-dom";
import SubmitTestSpeaking from "./SubmitTestSpeaking/SubmitTestSpeaking";

import CountdownTimer from "../common/CountdownTimer";
const DurationContainer = styled(Box)(({ theme }) => ({
  background: "#E0F7FA",
  borderRadius: "20px",
  fontSize: "14px",
  float:'right',
  padding: "1.5rem 3rem",
  border: '1px solid #000000',
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center',
}));

export default function InterviewInstruction({ datatest, status, setStatus , setSubmitTest}) {
  const storeName = "MyStore" + datatest.id;
  const navigate = useNavigate();
  const [indexSpeaking, setIndexSpeaking] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState({});
  const [submitTestQuestions, setSubmitTestQuestions] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [onDialogConfirm, setOnDialogConfirm] = useState(() => () => {});
  const [serialSet, setSerialSet] = useState(new Set());

  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", "MyStore" + datatest.id)
        .then((db) => {
          getData(db, "MyStore" + datatest.id,storeName)
            .then((data) => {
              if (data?.recordings) {
                setRecordings(data.recordings);   
                setSerialSet(data.serialSet);

                 
              } else {
                console.log("No answers found in IndexedDB");
                setRecordings({}); 
              }
            })
            .catch((error) => {
              console.error("Error fetching answers:", error);
            });
        })
        .catch((error) => {
          console.error("Error accessing IndexedDB:", error);
        });
    }

  }, []);
  
  useEffect(() => {
    if (datatest != null) {
      openDB("MyDatabase", storeName).then((db) => {
        saveData(db, "MyStore" + datatest.id, { id: storeName, recordings });
        saveData(db, "MyStore" + datatest.id, { id: storeName, serialSet });
        console.log(recordings);  
        
      }).catch((error) => {
        console.error("Error saving answers to the database:", error);
      });
    }
  }, [recordings]);

  
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
  const findIndicesBySerial = (serial, testSpeakings) => {
    let speakingIndex = 0;
    let questionIndex = 0;
  
    for (let i = 0; i < testSpeakings.length; i++) {
      const speaking = testSpeakings[i];
      for (let j = 0; j < speaking.questions.length; j++) {
        if (speaking.questions[j].serial === serial) {
          speakingIndex = i;
          questionIndex = j;
          break;
        }
      }
    }
  
    return { speakingIndex, questionIndex };
  };
   
  const handleSerialClick = (serial) => {
    const handleConfirmDialog = () => {
      setOnDialogConfirm(() => (shouldSave) => {
        setIsRecording(false); 
        const { speakingIndex, questionIndex } = findIndicesBySerial(serial, datatest?.testSpeakings);
        setIndexSpeaking(speakingIndex);
        setIndexQuestion(questionIndex);
      });
      setOpenDialog(true);
    };
  
    if (isRecording) {
      handleConfirmDialog();
    } else {
      const { speakingIndex, questionIndex } = findIndicesBySerial(serial, datatest?.testSpeakings);
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

  const handleStartRecording = () => {
    currentRecordingIdRef.current = {
      id: currentQuestion.id,
      serial: currentQuestion.serial,
    };
    setIsRecording(true);
  };

  const handleStopRecording = (recordedBlob) => {

    if (currentRecordingIdRef.current !== null && recordedBlob && recordedBlob.blobURL) {
      const reader = new FileReader();
      reader.readAsDataURL(recordedBlob.blob);
      reader.onloadend = () => {
        const base64Data = reader.result.split(",")[1];
        const audioURL = `data:audio/wav;base64,${base64Data}`;
        setRecordings((prev) => ({
          ...prev,
          [currentRecordingIdRef.current.id]: audioURL,
      }));
      };
    
      setSerialSet((prev) => new Set(prev).add(currentRecordingIdRef.current.serial));
    } else {
      console.error('Invalid currentRecordingIdRef or recordedBlob:', currentRecordingIdRef.current, recordedBlob);
    }
    setIsRecording(false);
  };

  const handleBtnSubmit = async () => {
 
    let user = await fetchUserInfo();
    let scoreTest=0;
    const vietnamTime = new Date().toLocaleString("en-CA", { timeZone: "Asia/Ho_Chi_Minh", hour12: false }).replace(", ", "T");
    const newSubmitTest = {
      id: '',
      testId: datatest.id,
      userId: user.id,
      score: 1,
      status: "ACTIVE",
      submitTime: vietnamTime,
      submitTestSpeakings: []
    }
    let totalQuestions=0;
    let scorePerQuestion = 0;
    for (const testSpeaking of datatest.testSpeakings) {
      totalQuestions += testSpeaking.questions.length;
    }

    if (totalQuestions > 0) {
      scorePerQuestion = 100 / totalQuestions;
    }

    for (const testSpeaking of datatest.testSpeakings) {
      for (const question of testSpeaking.questions) {

        let content = "No audio available. You haven't completed this question yet.";
        let transcript = "No transcipt available. You haven't completed this question yet."
        let comment = "No comment available. You haven't completed this question yet."
          let score = 0;
        if (recordings[question.id]) {
          console.log(recordings[question.id]);
          
          const result = await uploadFile(
            "test/speaking",
            question.id.replace(/\s+/g, "_") + "_" + Date.now() + "-" + Math.random().toString(36).substr(2, 9),
            recordings[question.id],
          );
          content = result.url;
          try {
  
            transcript = (await getSpeechToText(recordings[question.id])).transcript;
          } catch (error) {
        
            console.log("Proceeding with the next step...");
          
          }
        
         
          if(transcript!==null && transcript!=='')
          {

            let  dataScore= await scoreTestWriting(transcript, question.content,scorePerQuestion);
            score = dataScore.score.split("/")[0];;
            comment = dataScore.comment;
          }
          
   
        }
        scoreTest=scoreTest+ +score;
        let submitTestSpeakingQuestion = {
          id: '',
          testSpeakingQuestionId: question.id,
          submitTestId: '',
          score: score,
          content: content,
          explanation: transcript,
          comment: comment,
          status: "ACTIVE"
        }
        newSubmitTest.submitTestSpeakings.push(submitTestSpeakingQuestion);
      }
    }
    newSubmitTest.score= scoreTest;
    const createdSubmitTest = await createSubmitTest(newSubmitTest);
    newSubmitTest.submitTestSpeakings = newSubmitTest.submitTestSpeakings?.map((question) => ({
      ...question,
      submitTestId: createdSubmitTest.id,
    }));
    await Promise.all(
      newSubmitTest.submitTestSpeakings?.map((question) =>
        createSubmitTestSpeaking(question)
      )
    );
    deleteData('MyDatabase', 'MyStore'+datatest.id);
    const state = {
      id: createdSubmitTest.id,
      testId: datatest.id,
    };
    deleteData('MyDatabase', 'MyStore'+datatest.id);
    navigate("/student/history-test/speaking", { state });

  };

  const isLastQuestion = indexSpeaking === datatest?.testSpeakings.length - 1 && indexQuestion === currentSpeaking?.questions.length - 1;

  return (
    <>      <DurationContainer sx={{fontWeight: 'bold'  }} elevation={1}>
    <Typography align="center" >
    Time remaining: 
    </Typography>
    <Typography align="center" sx={{marginLeft:'1rem'}} >
    {
  datatest && 
  <CountdownTimer
  duration={datatest?.duration}
  handleSubmit={handleBtnSubmit}
  dbName={"MyDatabase"}
  storeName={storeName}
/>
 }
    </Typography>
  </DurationContainer>
    <Grid container spacing={4} sx={{  }}>
        
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
                      audioBitsPerSecond={128000}
                      sampleRate={48000}  
                 
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
                    backgroundColor: '#00796B',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#004d40', 
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
                    backgroundColor: isLastQuestion ? '#ccc' : '#00796B',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: isLastQuestion ? '#ccc' : '#004d40',
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
          handleBtnSubmit ={handleBtnSubmit}
        />
      </Grid>
    </Grid>
    </>

  );
}
