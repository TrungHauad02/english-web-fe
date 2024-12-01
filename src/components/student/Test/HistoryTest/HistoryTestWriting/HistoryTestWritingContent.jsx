import { Box, Typography, Button, Grid, Paper, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

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
  padding: '1rem',
  flex: '0 1 47%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: '1rem',
  borderRadius: '1rem',
}));

const EssayInput = ({ value = '' }) => {
  const calculateWordCount = (text) => {

    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  const wordCount = calculateWordCount(value);

  return (
    <StyledPaper elevation={3}>
      <TextField
        fullWidth
        multiline
        rows={10}
        variant="outlined"
        placeholder="No input allowed"
        value={value}
        InputProps={{ readOnly: true }}
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

function ContentTestWriting({ oneWriting, oneHistoryWriting, onClickTestAgain, Maxscore }) {
  return (
    <>
      <Box sx={{ display: 'flex', marginTop: '2%' }}>
        <TestContainer sx={{ flex: '1 1 49%' }}>
          <QuestionSection item>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                Question {oneWriting?.serial || ''}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  color: 'red',
                }}
              >
                {oneHistoryWriting?.score + "/" + Maxscore || ''}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ marginTop: '1rem' }}>
              {oneWriting?.content || 'No content available'}
            </Typography>
          </QuestionSection>
        </TestContainer>
        <Partition sx={{ flex: '1 1 0.2%' }} />
        <TestContainer sx={{ flex: '1 1 49%' }}>
          <EssayInput
            value={oneHistoryWriting?.content || ''}
          />
          <Button
            sx={{
              borderRadius: '1rem',
              backgroundColor: '#00796B',
              color: 'white',
              float: 'right',
              marginRight: '10%',
              marginBottom: '2%',
              padding: '1rem 2rem',
            }}
            onClick={onClickTestAgain} 
          >
            TEST AGAIN
          </Button>
        </TestContainer>
      </Box>
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: '1rem',
          padding: '1rem',
          backgroundColor: '#f9f9f9',
          marginTop: '1rem',
          alignItems: 'center',
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '1rem' }}>
          {oneHistoryWriting?.comment || 'No comment available'}
        </Typography>
      </Box>
    </>
  );
}

export default ContentTestWriting;
