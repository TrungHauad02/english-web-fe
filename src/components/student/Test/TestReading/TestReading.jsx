import { Box, Typography, Paper  } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle  from '../MainTitle';
import OneReadingTest from './OneReadingTest';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest'
import { useLocation } from 'react-router-dom';
import { getTest } from "api/test/TestApi";
import {createSubmitTest} from "../../../../api/test/submitTest"
import { fetchUserInfo } from "../../../../api/user/userService";
import {createSubmitTestReadingAnswer} from "../../../../api/test/submitTestReadingAnswer"


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


  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
    const { state } = location; 
    const [datatest, setdatatest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const  [score, setSCore] = useState(null);
    const title = datatest ? datatest.type : ''; 
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await getTest(state.id);
            if (data) {
                setdatatest(data);
            } else {
                setdatatest(null);
            }
        } catch (err) {
            setError("Failed to fetch test data");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [state.id]); 

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>{error}</div>;
}
  

  const onClickTestAgain = () => {


    setStatus('Testing');

    setRenderKey(renderKey + 1);
};

  const handlebtnSubmit = async () => {
    setStatus('Submit');
    const savedAnswers = localStorage.getItem('selectedAnswers'+datatest.id);
    let selectedAnswers = [];
    if (savedAnswers) {
        selectedAnswers= JSON.parse(savedAnswers);
    }

    localStorage.removeItem('selectedAnswers' + datatest.id);
    const score = calculateScore(selectedAnswers);
    setSCore(score);
    let user =  await fetchUserInfo();
    const submitTest = await createSubmitTest(
      {
        id: '',
        testId: datatest.id,
        userId: user.id,
        score:  score,
        status: "ACTIVE",
        submitTime: new Date().toISOString()

      }
    );
    datatest.testReadings.forEach((dataitem) => {
      dataitem.questions.forEach((question) => {
        const userAnswerContent = selectedAnswers[question.id];
        const userAnswer = question.answers.find(answer => answer.content === userAnswerContent);

        if (userAnswer) {
          createSubmitTestReadingAnswer({
            id: '', 
            submitTestId: submitTest.id,
            questionId: question.id,
            answerId: userAnswer.id, 
            comment: "tan",
            status: "ACTIVE"
          }).catch((error) => {
            console.error("Error saving answer:", error);
          });
        }
      });
    });
    localStorage.removeItem('selectedAnswers' + datatest.id);

  };



  const calculateScore = (selectedAnswers) => {
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
          score = {score}
          />
</Box>

    </Box>
  );
}

export default TestReading;