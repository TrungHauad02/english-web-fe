import { Box, Typography, Button, Grid, TextField, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useCallback } from 'react';

const TestContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  background: '#d9d9d938',
}));

const Partition = styled(Box)(({ theme }) => ({
  width: '0.5%',
  margin: '0 0.25%',
  background: '#D9D9D9',
}));

const QuestionSection = styled(Grid)(({ theme }) => ({
  marginRight: '2%',
  flex: '0 1 47%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  borderRadius: '8px',
}));

const EssayInput = ({ value, wordCount, onChange }) => {
  const handleEssayChange = useCallback((event) => {
    const text = event.target.value;
    const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    onChange(text, wordCount);
  }, [onChange]);

  return (
    <StyledPaper elevation={3}>
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
      <Box sx={{ mt: 1 }}>
        <Typography variant="body2">Words Count: {wordCount}</Typography> {/* Hiển thị số từ */}
      </Box>
    </StyledPaper>
  );
};

function ContentTestWriting({ datatest }) {

  const [answers, setAnswers] = useState({});


  const handleAnswerChange = (id, essay, wordCount) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: { essay, wordCount }, 
    }));
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
  };

  return (
    <>
      <Box sx={{  display: 'flex', marginTop: '2%' }}>
        <TestContainer sx={{ flex: '1 1 49%' }}>
          <QuestionSection item>
          <Typography variant="h5" sx={{ marginTop: '2%', fontWeight: 'bold' }}>
            Question {datatest.serial}
            </Typography>
            <Typography variant="body1" sx={{marginTop:'1rem'}}>{datatest.content}</Typography>
          </QuestionSection>
        </TestContainer>
        <Partition sx={{ flex: '1 1 0.2%' }} />
        <TestContainer sx={{ flex: '1 1 49%' }}>
    
          <EssayInput
            value={answers[datatest.id]?.essay || ''} 
            wordCount={answers[datatest.id]?.wordCount || 0} 
            onChange={(essay, wordCount) => handleAnswerChange(datatest.id, essay, wordCount)} 
          />
          <Button
            onClick={handleSubmit}
            sx={{
              border: '0.0001rem solid black',
              borderRadius: '1rem',
              background: '#FFD984',
              color: 'black',
              float: 'right',
              marginRight: '10%',
              marginBottom: '2%',
              padding: '1rem 2rem',
            }}
          >
            SUBMIT
          </Button>
        </TestContainer>
      </Box>
    </>
  );
}

export default ContentTestWriting;
