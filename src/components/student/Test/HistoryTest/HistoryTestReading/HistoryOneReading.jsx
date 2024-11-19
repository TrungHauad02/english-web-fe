import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';
import { useEffect, useState } from 'react';
import ListQuestionSubmit from '../common/ListQuestionSubmit';


function OneReadingTest({onereading,title,dataSubmitTest,handleTestAgain}){

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
      <Typography variant="body1" sx={{padding:"1rem"}}>
       {onereading.content}
      </Typography>
    </QuestionSection>
  </TestContainer>
  <Partition sx={{ flex: '1 1 0.2%' }}  />
  <TestContainer sx={{ flex: '1 1 49%',padding:'1rem'}}>
    <Box sx={{ border: '1px solid black',
  borderRadius: '1rem',padding: '1rem',marginBottom:'1rem' }} >
    <ListQuestionSubmit 
    dataTest= {onereading.questions}   
    dataSubmitTest= {dataSubmitTest} 
    title = {title} 
    />    
    </Box >
    <Button sx={{
  borderRadius: '1rem',   backgroundColor: '#FFD984' ,color:'black',float:'right',marginRight:'10%',marginBottom:'2%',padding:'1rem 2rem'}}  onClick={handleTestAgain } 
  >
  Test Again
      </Button>
  </TestContainer>
  </>
  );


}
export default OneReadingTest;
