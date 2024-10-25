import React, { useState } from 'react';
import { Box, Typography, Button, Grid, Fab } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MicIcon from '@mui/icons-material/Mic';
import GridSerials from './GridSerials';

export default function InterviewInstruction({ dataList, status }) {
  const [indexSpeaking, setIndexSpeaking] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);

  const currentSpeaking = dataList[indexSpeaking];
  const currentQuestion = currentSpeaking?.questions[indexQuestion];

  const getSerialNumber = () => indexSpeaking * currentSpeaking.questions.length + indexQuestion + 1;

  const handleNextQuestion = () => {
    if (indexQuestion < currentSpeaking.questions.length - 1) {
      setIndexQuestion(indexQuestion + 1);
    } else if (indexSpeaking < dataList.length - 1) {
      setIndexSpeaking(indexSpeaking + 1);
      setIndexQuestion(0);
    }
  };

  const handlePreviousQuestion = () => {
    if (indexQuestion > 0) {
      setIndexQuestion(indexQuestion - 1);
    } else if (indexSpeaking > 0) {
      setIndexSpeaking(indexSpeaking - 1);
      setIndexQuestion(dataList[indexSpeaking - 1].questions.length - 1);
    }
  };

  const handleSerialClick = (serial) => {
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

  const isLastQuestion =
    indexSpeaking === dataList.length - 1 && indexQuestion === currentSpeaking?.questions.length - 1;

  return (
    <Grid container spacing={4} sx={{ padding: '2rem' }}>
      {/* Câu hỏi hiện tại */}
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
                <Fab
                  color="error" // Chuyển sang màu đỏ
                  aria-label="mic"
                  sx={{ marginBottom: '1.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
                >
                  <MicIcon sx={{ fontSize: '3rem' }} />
                </Fab>
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
                disabled={isLastQuestion} // Disable khi đến câu hỏi cuối cùng
                sx={{
                  borderRadius: '1rem',
                  padding: '0.8rem 2rem',
                  backgroundColor: isLastQuestion ? '#ccc' : '#007bff', // Màu xám khi disable
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
        />
      </Grid>
    </Grid>
  );
}
