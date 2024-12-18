import MainTitle from "../../MainTitle";
import OneListeningTest from "./HistoryOneListening";
import { Box,CircularProgress } from "@mui/material";

import React, { useState, useEffect } from 'react';
import ScoreGrid from "./ScoreGrid";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {getHistoryTest} from "../common/getHistoryTest";
import useColor from "shared/color/Color";
import BtnPreviousNextContentTest from "../../common/BtnPreviousNextContentTest";
function HistoryTestListening() {
    const [indexVisible, setIndexVisible] = useState(0);
    const location = useLocation();
    const { state } = location;
    const [test, setTest] = useState(null);
    const [historyTest, setHistoryTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const data = test?.testListenings;
    const [focusId,setFocusId] = useState();
    const color = useColor();
    

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getHistoryTest(state, navigate);
        if (result) {
          const { test, submitTest } = result;
  
          if (test) {
            const updateDataTest = (data) => {
              let serialCounter = 1;
              return {
                ...data,
                testListenings: data.testListenings.map((item) => ({
                  ...item,
                  questions: item.questions.map((question) => ({
                    ...question,
                    serial: question.serial !== undefined ? serialCounter++ : question.serial,
                  })),
                })),
              };
            };
  
            const updatedData = updateDataTest(test);
            setTest(updatedData); 
          }
  
          if (submitTest) {
            setHistoryTest(submitTest); 
          }
        }
      } catch (err) {
        setError("Failed to fetch test data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, state?.id, state?.testId]);

  if (loading) {
    return <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      zIndex: 1000,
    }}
  >
    <CircularProgress sx={{color: color.Color2}} />
  </Box>;
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
    setFocusId(serial);
    
    if (newIndex !== -1) {
      setIndexVisible(newIndex); 
    } else {
      console.error("TestListening not found for serial:", serial);
    }

  };

const getListSerialQuestion = () => {
  const serials = []; 

  data.map(dataListening => 
    dataListening.questions.map(question => {
      serials.push(question.serial);
      return question.serial; 
    })
  );
  return serials; 
};

  return (
    <Box>
       <MainTitle
        title="Listening"
        bg="https://firebasestorage.googleapis.com/v0/b/englishweb-5a6ce.appspot.com/o/static%2Fbg_test.png?alt=media"
      />
      <Box sx={{ marginTop: '5%', marginBottom: '1rem', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight:  '25%' }}>
      <BtnPreviousNextContentTest
        indexVisible={indexVisible}
        setIndexVisible={setIndexVisible}
        sumContent={test?.testListenings?.length || 0}
      />
      </Box>
      <Box sx={{ display: 'flex',  marginLeft: '5%', marginRight: '5%',marginBottom: '1rem'  }}>
      <Box sx={{  width: '100%' }}>
        <Box sx={{ border: '1px solid black', borderRadius: '1rem', padding: '0.5rem',  width: '100%' }}>
            <OneListeningTest 
                oneListening={data[indexVisible]} 
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