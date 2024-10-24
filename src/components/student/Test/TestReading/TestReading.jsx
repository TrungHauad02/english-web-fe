import { Box, Typography, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from '../MainTitle';
import OneReadingTest from './OneReadingTest';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest'
import { useLocation } from 'react-router-dom';



const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));


function TestReading() {
  const [status, setStatus] = useState('Testing');
  const [indexVisible, setIndexVisible] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0); 
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
  const { state } = location; 
  const datatest = state;
  const title = datatest.type;
  console.log(datatest);
  
  
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

    datatest.testReadings.forEach((data) => {
      data.questions.forEach((question) => {
        const correctAnswer = question.answers.find(answer => answer.isCorrect);
        if (correctAnswer && selectedAnswers[question.id] === correctAnswer.content) {
          score += 1;
          
        }
      });
    });

    return score;
  };

  return (
    <Box >
     <MainTitle title="Reading" bg={"/bg_test.png"} />
      <DurationContainer sx={{marginRight:  '5%'}} elevation={1}>
      <Typography align="center">
          <strong>Time remaining:</strong>
          <br />
          60:00
        </Typography>
       
      </DurationContainer>
      <BtnPreviousNextContentTest indexVisible = {indexVisible}  setIndexVisible={setIndexVisible} sumcontent = { datatest.testReadings.length}  />
      <Box sx={{marginRight: '5%', marginLeft: '5%', display: 'flex' , marginTop:'2%'}}>
          <OneReadingTest key= {renderKey} status={status} onereading={ datatest.testReadings[indexVisible]} handlebtnSubmit={handlebtnSubmit} 
          title = {title}
          onClickTestAgain ={onClickTestAgain}
          calculateScore = {calculateScore}
          />
</Box>

    </Box>
  );
}

export default TestReading;