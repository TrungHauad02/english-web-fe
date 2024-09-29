import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const TestContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  background: '#fff',
}));

const QuestionSection = styled(Grid)(({ theme }) => ({
  marginRight: '2%',
  flex: '0 1 47%',
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
        rows={15}
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
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2">Words Count: {wordCount}</Typography>
      </Box>
    </>
  );
};

function ContentWritingMixing({ datatest, title,onAnswerChange }) {
  const [answer, setAnswer] = useState({ essay: '', wordCount: 0 });

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers' + title)) || {};
    const savedAnswer = savedAnswers[datatest.id] || { essay: '', wordCount: 0 };
    setAnswer(savedAnswer);
  }, [datatest.id, title]);

  const handleAnswerChange = useCallback((essay, wordCount) => {
    setAnswer({ essay, wordCount });

    const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers' + title)) || {};
    savedAnswers[datatest.id] = { essay, wordCount };
    localStorage.setItem('selectedAnswers' + title, JSON.stringify(savedAnswers));
    onAnswerChange()

    
    
  }, [datatest.id, title]);

  return (
    <Box sx={{ display: 'flex', marginTop: '2%' }}>
      <TestContainer sx={{ flex: '1 1 49%' }}>
        <QuestionSection item>
          <Typography variant="h5" sx={{ marginTop: '2%', fontWeight: 'bold' }}>
            Question {datatest.serial}
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '1rem' }}>{datatest.content}</Typography>
        </QuestionSection>
      </TestContainer>

      <TestContainer sx={{ flex: '1 1 49%' }}>
        <EssayInput
          value={answer.essay}
          wordCount={answer.wordCount}
          onChange={handleAnswerChange}
        />
      </TestContainer>
    </Box>
  );
}

export default ContentWritingMixing;
