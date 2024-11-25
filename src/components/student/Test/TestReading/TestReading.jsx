import { Box, Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import MainTitle from '../MainTitle';
import OneReadingTest from './OneReadingTest';
import React, { useState, useEffect } from 'react';
import BtnPreviousNextContentTest from '../common/BtnPreviousNextContentTest';
import { useLocation, useNavigate } from 'react-router-dom';
import { getTest } from 'api/test/TestApi';
import { createSubmitTest } from '../../../../api/test/submitTest';
import { fetchUserInfo } from '../../../../api/user/userService';
import { createSubmitTestReadingAnswer } from '../../../../api/test/submitTestReadingAnswer';
import { commentReadingQuestion,scoreTestSpeakingQuestion } from '../../../../api/test/commentTest';


const DurationContainer = styled(Paper)(({ theme }) => ({
  background: '#FFF4CC',
  borderRadius: '20px',
  fontSize: '14px',
  float: 'right',
  marginRight: '5%',
  padding: theme.spacing(2),
}));

function TestReading() {
  const [indexVisible, setIndexVisible] = useState(0);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const [renderKey, setRenderKey] = useState(0);
  const location = useLocation();
  const { state } = location;
  const [datatest, setdatatest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setSCore] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); 
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
        setError('Failed to fetch test data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>{error}</Typography>
      </Box>
    );
  }

  const handlebtnSubmit = async () => {
  
    
    setIsSubmitting(true); 
    const score = calculateScore();
    let user = await fetchUserInfo();

    let submitTest = {
      id: '',
      testId: datatest.id,
      userId: user.id,
      score: score,
      status: 'ACTIVE',
      submitTime: new Date().toISOString(),
      submitTestReadingAnswers: []
    };

    try {
      const commentPromises = datatest.testReadings.flatMap(reading =>
        reading.questions.map(async question => {
          const userAnswerId = answers[question.id];

          if (!userAnswerId) {
            submitTest.submitTestReadingAnswers.push({
              id: '',
              submitTestId: '',
              questionId: question.id,
              answerId: '',
              comment: 'User did not answer the question',
              status: 'ACTIVE'
            });
            return;
          }

          const userAnswer = question.answers.find(answer => answer.id === userAnswerId);

          if (userAnswer) {
            try {
              const commentResponse = await commentReadingQuestion({
                questionContent: question.content,
                readingContent: reading.content,
                answers: question.answers.map(ans => ans.content),
                userAnswer: userAnswer.content
              });

              const comment = commentResponse && commentResponse.comment ? commentResponse.comment : 'No comment available';

              submitTest.submitTestReadingAnswers.push({
                id: '',
                submitTestId: '',
                questionId: question.id,
                answerId: userAnswer.id,
                comment: comment,
                status: 'ACTIVE'
              });
            } catch (error) {
              console.error('Error fetching comment for question:', error);
            }
          }
        })
      );

      await Promise.all(commentPromises);

      const savedSubmitTest = await createSubmitTest(submitTest);
      const saveAnswerPromises = submitTest.submitTestReadingAnswers.map(answer => {
        answer.submitTestId = savedSubmitTest.id;
        return createSubmitTestReadingAnswer(answer).catch(error => {
          console.error('Error saving answer:', error);
        });
      });

      await Promise.all(saveAnswerPromises);

      const state = {
        id: savedSubmitTest.id,
        testId: datatest.id,
      };
      navigate('/student/history-test/reading', { state });
    } catch (error) {
      console.error('Error creating submitTest:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  const calculateScore = () => {
    let totalQuestions = 0;
    let score = 0;

    datatest.testReadings.forEach((data) => {
      totalQuestions += data.questions.length;
    });

    const pointPerQuestion = 100 / totalQuestions;
    datatest.testReadings.forEach((data) => {
      data.questions.forEach((question) => {
        const correctAnswer = question.answers.find(answer => answer.isCorrect);
        if (correctAnswer && answers[question.id] === correctAnswer.id) {
          score += pointPerQuestion;
        }
      });
    });

    return Math.round(score * 100) / 100;
  };

  return (
    <Box>
    {isSubmitting && (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100vh', 
        backgroundColor: 'rgba(255, 255, 255, 0.7)', 
        zIndex: 1000 
      }}>
        <CircularProgress />
      </Box>
    )}
    <MainTitle title="Reading" bg={"/bg_test.png"} />
    <DurationContainer sx={{ marginRight: '5%' }} elevation={1}>
      <Typography align="center">
        <strong>Time remaining:</strong>
        <br />
        60:00
      </Typography>
    </DurationContainer>
    <BtnPreviousNextContentTest
      indexVisible={indexVisible}
      setIndexVisible={setIndexVisible}
      sumcontent={datatest.testReadings.length}
    />
    <Box sx={{ marginRight: '5%', marginLeft: '5%', display: 'flex', marginTop: '2%' }}>
      <OneReadingTest
        key={renderKey}
        onereading={datatest.testReadings[indexVisible]}
        handlebtnSubmit={handlebtnSubmit}
        title={title}
        answers={answers}
        setAnswers={setAnswers}
      />
    </Box>
  </Box>
  
  );
}

export default TestReading;
