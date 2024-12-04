import MainTitle from "../../MainTitle";
import OneListeningTest from "./HistoryOneListening";
import { Box, Typography, Button, duration } from "@mui/material";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ScoreGrid from "./ScoreGrid";
import { useLocation } from 'react-router-dom';
import { getTest } from 'api/test/TestApi';
import { getSubmitTest } from 'api/test/submitTest';
import { useNavigate } from 'react-router-dom';

function HistoryTestListening() {
    const [indexVisible, setIndexVisible] = useState(0);
    const location = useLocation();
    const { state } = location;
    const [test, setTest] = useState(null);
    const [historyTest, setHistoryTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const title = test ? test.type : ''; 
    const data = test?.testListenings;
    const [focusId,setfocusId] = useState();
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const testResult = await getTest(state.testId);
        const historyTestResult = await getSubmitTest(state.id);

        if (testResult) {
          setTest(testResult);
        }
        if (historyTestResult) {
          setHistoryTest(historyTestResult);
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.id, state.testId]);

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div>{error}</div>;
}

const handleTestAgain = () => {

    const state = {
        id: test.id,
    }
    navigate('/student/test/listening', { state });
  };

const handlebtnPrevious = () => {
  setIndexVisible((prevIndex) => {
    if (prevIndex > 0) {
      return prevIndex - 1;
    }
    return prevIndex;
  });
};

const handlebtnNext = () => {
  setIndexVisible((prevIndex) => {
    if (data.length > prevIndex + 1) {
      return prevIndex + 1;
    }
    return prevIndex;
  });
};

const evaluateListeningTestResults = () => {

  return data.flatMap(testListening =>
    testListening.questions.map(question => {
   
      const correctAnswer = question.answers.find(answer => answer?.isCorrect);
 
      const selectedAnswer = historyTest?.submitTestListeningAnswers?.find(
        submit => submit?.questionId === question.id
      )?.answerId;
     
      if (!correctAnswer || selectedAnswer === undefined) {
        return -1; 
      }

      return selectedAnswer === correctAnswer.id ? 1 : -1; 
    })
  );
};




const handleItemClick = (serial) => {

    const newIndex = data.findIndex(dataItem => 
      dataItem.questions.some(question => question.serial === serial)
    );

    if (newIndex !== -1) {
      setIndexVisible(newIndex); 
    } else {
      console.error("TestListening not found for serial:", serial);
    }
  };

const getListSerialQuestion = () => {
  const serials = []; 

  data.map(dataitem => 
    dataitem.questions.map(question => {
      serials.push(question.serial);
      return question.serial; 
    })
  );
  return serials; 
};

  return (
    <Box>
      <Box sx={{ marginTop: '5%', marginBottom: '1rem', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight:  '25%' }}>
        <Box sx={{ display: 'flex', mt: 5, marginLeft: '5%', width: '45%', justifyContent: 'center' }}>
         <Button variant="contained" sx={{ background: '#00796B', padding: '0.5rem', width: '7rem', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}
              startIcon={<img src="/btn_previous.png" alt="Previous" style={{ width: '1rem', height: '1rem' }} />} onClick={handlebtnPrevious}  >Previous</Button>
          <Box variant="body1" sx={{ mx: 2, background: '#E0F7FA', padding: '0.5rem 2rem', textAlign: 'center', alignContent: 'center', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}>{(indexVisible + 1)}/{data.length}</Box>
            <Button variant="contained" sx={{ background: '#00796B', padding: '0.5rem 1rem', width: '7rem', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}
              endIcon={<img src="/btn_next.png" alt="Next" style={{ width: '1rem', height: '1rem' }}  />} onClick={handlebtnNext}>Next</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex',  marginLeft: '5%', marginRight: '5%',marginBottom: '1rem'  }}>
      <Box sx={{  width: '100%' }}>
        <Box sx={{ border: '1px solid black', borderRadius: '1rem', padding: '0.5rem',  width: '100%' }}>
            <OneListeningTest 
                onelistening={data[indexVisible]} 
                dataSubmitTest ={historyTest.submitTestListeningAnswers}
                focusId={focusId}
            /> 
        </Box>
        </Box>
        <Box sx={{ marginLeft:"2rem" , width:'15%'}}> 
        <ScoreGrid 
            score={historyTest?.score} 
            gridData={evaluateListeningTestResults()} 
            serials={getListSerialQuestion()} 
            onItemClick={handleItemClick} 
            handleTestAgain={handleTestAgain} 
            />
            </Box>
  
    </Box>
    </Box>
  );
}

export default HistoryTestListening;