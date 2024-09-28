import { Box, Typography, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from '../MainTitle';
import OneReadingTest from './OneReadingTest';
import DataTestReading from './DataTestReading';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest'



const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));


function TestReading({list,quote, title, bg}) {
  const [status, setStatus] = useState('Testing');
  const [indexVisible, setIndexVisible] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0); 
  const [renderKey, setRenderKey] = useState(0);
  
  const onClickTestAgain = () => {
    localStorage.removeItem('selectedAnswers' + title);
    setSelectedAnswers([]);
    setStatus('Testing');

    setRenderKey(renderKey + 1);
};

 



  const handlebtnSubmit = () => {
    setStatus('Submit');
    const savedAnswers = localStorage.getItem('selectedAnswers'+title);

    if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers));
    }
  };

  const calculateScore = () => {
    let score = 0;



    DataTestReading.datacontent.forEach((data) => {
      data.questions.forEach((question) => {
        const correctAnswer = question.options.find(option => option.isCorrect);
        if (correctAnswer && selectedAnswers[question.id] === correctAnswer.content) {
          score += 1;
          console.log('score');
          
        }
      });
    });

    return score;
  };

  return (
    <Box >
     <MainTitle title="Reading" bg={bg} />
      <DurationContainer sx={{marginRight: status === 'Submit' ? '21%' : '5%',width: status === 'Submit' ? '10%' : 'initial'}} elevation={1}>
        {
          status==="Testing" &&
          <Typography align="center">
          <strong>Time remaining:</strong>
          <br />
          60:00
        </Typography>
          
        }
        {
          status==="Submit" &&
          <Typography align="center">
               <strong> Score: </strong>
          <br />
          {   calculateScore()}
    
       
        </Typography>
        }
      </DurationContainer>
      <BtnPreviousNextContentTest indexVisible = {indexVisible}  setIndexVisible={setIndexVisible} sumcontent = {DataTestReading.datacontent.length}  />
      <Box sx={{marginRight: '5%', marginLeft: '5%', display: 'flex' , marginTop:'2%'}}>
          <OneReadingTest key= {renderKey} status={status} onereading={DataTestReading.datacontent[indexVisible]} handlebtnSubmit={handlebtnSubmit} 
          title = {title}
          onClickTestAgain ={onClickTestAgain}
          />
</Box>

    </Box>
  );
}

export default TestReading;