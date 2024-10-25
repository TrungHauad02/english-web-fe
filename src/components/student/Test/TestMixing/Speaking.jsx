import React, { useState } from 'react';
import { Box, Typography, Fab, Button } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PropTypes from 'prop-types';

const SpeakingTest = ({ dataTest, focusId, status }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!dataTest || dataTest.length === 0) {
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
        <Typography variant="h4" sx={{ fontWeight: 'bold', marginBottom: '1rem' }}>
          No Speaking Questions Available
        </Typography>
      </Box>
    );
  }

  let currentQuestion = null;
  let currentTitle = '';
  for (let i = 0; i < dataTest.length; i++) {
    const foundQuestion = dataTest[i].questions.find((question) => question.serial === focusId);
    if (foundQuestion) {
      currentQuestion = foundQuestion;
      currentTitle = dataTest[i].title;
      break;
    }
  }
  if (!currentQuestion) {
    currentQuestion = dataTest[0].questions[currentIndex];
    currentTitle = dataTest[0].title;
  }

  const handleNext = () => {
    if (currentIndex < dataTest[0].questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
      <Fab color="error" aria-label="mic" sx={{ boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
        <MicIcon sx={{ fontSize: '3rem' }} />
      </Fab>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '2rem' }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          sx={{
            borderRadius: '1rem',
            padding: '0.8rem 2rem',
            backgroundColor: currentIndex === 0 ? '#ccc' : '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor: currentIndex === 0 ? '#ccc' : '#0056b3',
            },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
          disabled={currentIndex === dataTest[0].questions.length - 1}
          sx={{
            borderRadius: '1rem',
            padding: '0.8rem 2rem',
            backgroundColor: currentIndex === dataTest[0].questions.length - 1 ? '#ccc' : '#007bff',
            color: '#fff',
            '&:hover': {
              backgroundColor: currentIndex === dataTest[0].questions.length - 1 ? '#ccc' : '#0056b3',
            },
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

SpeakingTest.propTypes = {
  dataTest: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      questions: PropTypes.arrayOf(
        PropTypes.shape({
          serial: PropTypes.number.isRequired,
          content: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  focusId: PropTypes.number,
  status: PropTypes.string.isRequired,
};

export default SpeakingTest;
