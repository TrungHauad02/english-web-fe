import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Typography, Grid, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const TestContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  background: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: theme.spacing(3),
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
}));

const EssayInput = ({ value, wordCount, onChange }) => {
  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    onChange(text, wordCount);
  }, [onChange]);

  return (
    <>
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        placeholder="Type your essay here..."
        value={value}
        onChange={handleEssayChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
      />
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">Words Count: {wordCount}</Typography>
      </Box>
    </>
  );
};

function ContentWritingMixing({ datatestList, title, answers,setAnswers ,focusId }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const questionRefs = useRef([]);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers' + datatestList[0].testId)) || {};
    const initialAnswers = {};
    datatestList.forEach(datatest => {
      initialAnswers[datatest.id] = savedAnswers[datatest.id] || { essay: '', wordCount: 0 };
    });
    setAnswers(initialAnswers);
  }, [datatestList, title]);

  useEffect(() => {
    // Cuộn đến phần tử có serial bằng với focusId
    const targetIndex = datatestList.findIndex(item => item.serial === focusId);
    if (targetIndex !== -1) {
      setCurrentIndex(targetIndex);
      questionRefs.current[targetIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [focusId, datatestList]);

  const handleAnswerChange = useCallback((id, essay, wordCount) => {
    setAnswers(prev => ({
      ...prev,
      [id]: { essay, wordCount }
    }));
  }, []);

  const handleNext = () => {
    if (currentIndex < datatestList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      questionRefs.current[currentIndex + 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      questionRefs.current[currentIndex - 1]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentQuestion = datatestList[currentIndex];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '2rem' }}>
      <TestContainer ref={el => questionRefs.current[currentIndex] = el}>
        <Typography variant="h5" sx={{ marginTop: '1rem', fontWeight: 'bold' }}>
          Question {currentQuestion.serial}
        </Typography>
        <Typography variant="body1" sx={{ marginTop: '1rem' }}>{currentQuestion.content}</Typography>
        <Box sx={{ flex: '1', marginTop: '2rem' }}>
          <EssayInput
            value={answers[currentQuestion.id]?.essay || ''}
            wordCount={answers[currentQuestion.id]?.wordCount || 0}
            onChange={(essay, wordCount) => handleAnswerChange(currentQuestion.id, essay, wordCount)}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            sx={{
              backgroundColor: currentIndex === 0 ? '#e0e0e0' : '#42a5f5',
              color: '#fff',
              '&:hover': {
                backgroundColor: currentIndex === 0 ? '#e0e0e0' : '#1e88e5',
              },
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNext}
            disabled={currentIndex === datatestList.length - 1}
            sx={{
              backgroundColor: currentIndex === datatestList.length - 1 ? '#e0e0e0' : '#42a5f5',
              color: '#fff',
              '&:hover': {
                backgroundColor: currentIndex === datatestList.length - 1 ? '#e0e0e0' : '#1e88e5',
              },
            }}
          >
            Next
          </Button>
        </Box>
      </TestContainer>
    </Box>
  );
}

export default ContentWritingMixing;
