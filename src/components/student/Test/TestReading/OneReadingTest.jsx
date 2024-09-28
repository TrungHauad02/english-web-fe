import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';
import { useEffect, useState } from 'react';
import ListQuestion from '../common/ListQuestion';


function OneReadingTest({onereading,status,onAnswerChange,handlebtnSubmit,title,onClickTestAgain}){





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
  
  return (
    <>
    <TestContainer sx={{ flex: '1 1 49%'  }}>
    <QuestionSection item >
      <Typography variant="body1" sx={{marginTop:'2%'}}>
        These lessons include readings, vocab, quizzes and comprehension questions, as well as topics for discussion and essays. If you care about our Earth, but find it hard to express your opinions and concerns in English, these pages will help you...
      </Typography>
    </QuestionSection>
  </TestContainer>
  <Partition sx={{ flex: '1 1 0.2%' }}  />
  <TestContainer sx={{ flex: '1 1 49%'}}>
    <Box sx={{ border: '1px solid black',
  borderRadius: '1rem',padding: '0.5rem',margin:'0.5rem' }} >
    <ListQuestion 
    dataTest= {onereading} status ={status} onAnswerChange ={onAnswerChange} 
    title = {title} 
    />

    
    </Box>
    <Button sx={{border: '0.0001rem solid black',
  borderRadius: '1rem',background:'#FFD984',color:'black',float:'right',marginRight:'10%',marginBottom:'2%',padding:'1rem 2rem'}}  onClick={status === 'Testing' ? handlebtnSubmit : onClickTestAgain } 
  >
       {status === 'Testing' ? 'SUBMIT' : 'TEST AGAIN'}
      </Button>
  </TestContainer>
  </>
  
  );


}
export default OneReadingTest;
