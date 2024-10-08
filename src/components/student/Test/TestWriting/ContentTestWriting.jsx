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
  padding:'1rem',
  flex: '0 1 47%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: '1rem',
  borderRadius: '1rem',
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
        <Typography variant="body2">Words Count: {wordCount}</Typography>
      </Box>
    </StyledPaper>
  );
};

function ContentTestWriting({ datatest,handlebtnSubmit,onClickTestAgain,status,calculateScore }) {

  const [answers, setAnswers] = useState({});


  const handleAnswerChange = (id, essay, wordCount) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [id]: { essay, wordCount }, 
    }));
  };



  return (
    <>
      <Box sx={{  display: 'flex', marginTop: '2%' }}>
        <TestContainer sx={{ flex: '1 1 49%' }}>
          <QuestionSection item>
          <Typography variant="h5" sx={{  fontWeight: 'bold' }}>
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
           {
      status === 'Submit' ?  <Box sx={{marginLeft:'1rem',float:'left',borderRadius: '1rem',border:'solid 0.02rem',padding:'1rem 2rem'}}>
      <Typography align="center">
          Score: {calculateScore()}
          </Typography>
      </Box> : null
    }
   
   
    <Button sx={{
  borderRadius: '1rem',   backgroundColor: status === 'Testing' ? '#FFD984' : '#4A90E2',color:'black',float:'right',marginRight:'10%',marginBottom:'2%',padding:'1rem 2rem'}}  onClick={status === 'Testing' ? handlebtnSubmit : onClickTestAgain } 
  >
       {status === 'Testing' ? 'SUBMIT' : 'TEST AGAIN'}
      </Button>
        </TestContainer>
      </Box>
    </>
  );
}

export default ContentTestWriting;
