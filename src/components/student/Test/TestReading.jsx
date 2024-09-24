import React from 'react';
import { Box, Typography, Button, Container, Grid, Icon, Radio, RadioGroup, FormControlLabel, FormControl, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from './MainTitle';
import ListQuestion from './ListQuestion';





const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));

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

function TestReading({list,quote, title, bg}) {
  return (
    <Box >
     <MainTitle title="Reading" bg={bg} />
      <DurationContainer elevation={1}>
        <Typography align="center">
          <strong>Time remaining:</strong>
          <br />
          60:00
        </Typography>
      </DurationContainer>

      <Box sx={{ display: 'flex', mt: 5, marginLeft:'5%', width:'45%',justifyContent:'center' }}>
        <Button variant="contained" sx={{ background: '#ACCD0A',padding:'0.5rem',width:'7rem',fontSize: '1rem',fontFamily:'Roboto',fontWeight:'500'}} 
        startIcon={<img src="/btn_previous.png" alt="Previous" style={{ width: '1rem', height: '1rem' }} />} >Previous</Button>

        <Box variant="body1" sx={{ mx: 2, background: '#FFF4CC', padding:'0.5rem 2rem', textAlign:'center',alignContent: 'center',fontSize: '1rem',fontFamily:'Roboto',fontWeight:'500' }}>1/10</Box>
        <Button variant="contained" sx={{ background: '#ACCD0A', padding:'0.5rem 1rem',width:'7rem', fontSize: '1rem',fontFamily:'Roboto',fontWeight:'500' }} 
        endIcon={<img src="/btn_next.png" alt="Next" style={{ width: '1rem', height: '1rem' }} />}>Next</Button>
      </Box>

      <Box sx={{marginRight: '5%', marginLeft: '5%', display: 'flex' , marginTop:'2%'}}>
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
    <ListQuestion/>
    </Box>
    <Button sx={{border: '0.0001rem solid black',
  borderRadius: '1rem',background:'#FFD984',color:'black',float:'right',marginRight:'10%',marginBottom:'2%',padding:'1rem 2rem'}}>
       SUBMIT
      </Button>
  </TestContainer>
</Box>

    </Box>
  );
}

export default TestReading;