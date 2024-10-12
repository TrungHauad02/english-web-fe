import MainTitle from "./MainTitle";
import OneListeningTest from "./OneListeningTest";
import { Box, Typography, Button } from "@mui/material";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import DataListQuestion from "./TestListening/DataListQuestion";
import ScoreGrid from "./ScoreGrid";

function TestListening({ list, quote, title, bg }) {
  const [status, setStatus] = useState('Begin');
  const [renderKey, setRenderKey] = useState(0);
  const onClickTestAgain = () => {
    localStorage.removeItem('selectedAnswers' + title);

    setStatus('Testing');

    setRenderKey(renderKey + 1);
};

  const audioRef = useRef(null);

  return (
    <Box>
      <MainTitle title={title} bg={bg} />
      {status === 'Begin'
        ? <IntroduceTest setStatus={setStatus} />
        : <TestingListening key={renderKey} audioRef={audioRef} status={status} setStatus={setStatus} title={title}
        onClickTestAgain ={onClickTestAgain}
        />
      }
   
    </Box>
  );
}

function IntroduceTest({ setStatus }) {
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    
    }}>
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        width: '80vh',
        textAlign: 'center',
        border: '0.2rem solid ',
        padding: '20px',
        borderRadius: '2rem',
        backgroundColor: '#f9f9f9',
        margin: '5%'
      }}
    >
      <Typography variant="h4" gutterBottom>
        Bài test 1
      </Typography>
      <Typography variant="body1" gutterBottom>
        Thời gian làm bài: 60 phút
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ACCD0A',
          '&:hover': { backgroundColor: '#8CAB0A' }
        }}
        onClick={() => setStatus('Testing')}
      >
        Bắt đầu
      </Button>
    </Box>

    </Box>
   
  );
}

function TestingListening({ audioRef, status, setStatus,title,onClickTestAgain}) {
  const [indexVisible, setIndexVisible] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0); 
  const [gridData, setGridData] = useState([]); 
  const [focusId,setfocusId] = useState();

  




  const onAudioEnd = () => {
    if (DataListQuestion.length > indexVisible + 1) {
      setIndexVisible(indexVisible + 1);
    }
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
      if (DataListQuestion.length > prevIndex + 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  useEffect(() => {
    if (status === 'Testing' && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed: ", error);
      });
    }
    if (status === 'Submit' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [status]);
  const handleSubmit = async () => {
    // Đặt trạng thái là 'Submit'
    setStatus('Submit');

    // Lấy câu trả lời đã lưu từ local storage
    const savedAnswers = localStorage.getItem('selectedAnswers' + title);

    if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers));
    }




 
};
useEffect(() => {
  if(status==="Submit")
  {
    const score = calculateScore();
    setScore(score);
    setGridData(generateGridData()); 
  }


  
}, [selectedAnswers]); 














  const calculateScore = () => {
    let score = 0;

    if (!Array.isArray(DataListQuestion)) {
      console.error("DataListQuestion is not an array");
      return score;
    }

    DataListQuestion.forEach((data) => {
      data.questions.forEach((question) => {
        const correctAnswer = question.options.find(option => option.isCorrect);
        if (correctAnswer && selectedAnswers[question.id] === correctAnswer.content) {
          score += 1;
        }
      });
    });

    return score;
  };

  const generateGridData = () => {
   
    return DataListQuestion.flatMap(data =>
      data.questions.map(question => {
        const correctAnswer = question.options.find(option => option.isCorrect);
        const selectedAnswer = selectedAnswers[question.id];
    
   
        if (selectedAnswer === undefined) {

          return -1; // Chưa chọn
          
        }
        return selectedAnswer === correctAnswer.content ? 1 : 0; 
      })
    );
  };
  const getListSerialQuestion = () => {
    const serials = []; 

    DataListQuestion.map(data => 
      data.questions.map(question => {
        serials.push(question.serial);
        return question.serial; 
      })
    );
    return serials; 
  };

const onItemClick = useCallback((serial) => {
  setfocusId(serial);
  const newIndex = Math.floor((serial-1) / 3);

  if (newIndex !== indexVisible) {
    setIndexVisible(newIndex);
  }
}, [indexVisible]);

  

  return (
    <>
     {status === 'Testing' && (
         <Box sx={{
          background: '#FFF4CC',
          borderRadius: '1rem',
          fontSize: '1rem',
          float: 'right',
          marginRight: '5%',
          width: '10%',
          padding: '0.5rem 1rem'
        }}>
          <CountdownTimer/>
        </Box>
     )}
   
    
      <Box sx={{ marginTop: '5%', marginBottom: '1rem', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: status === 'Submit' ? '25%' : '5%', }}>
        <Box sx={{ display: 'flex', mt: 5, marginLeft: '5%', width: '45%', justifyContent: 'center' }}>
          {status === 'Submit'
            ? <Button variant="contained" sx={{ background: '#ACCD0A', padding: '0.5rem', width: '7rem', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}
              startIcon={<img src="/btn_previous.png" alt="Previous" style={{ width: '1rem', height: '1rem' }} />} onClick={handlebtnPrevious}  >Previous</Button>
            : null}
          <Box variant="body1" sx={{ mx: 2, background: '#FFF4CC', padding: '0.5rem 2rem', textAlign: 'center', alignContent: 'center', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}>{(indexVisible + 1)}/{DataListQuestion.length}</Box>
          {status === 'Submit'
            ? <Button variant="contained" sx={{ background: '#ACCD0A', padding: '0.5rem 1rem', width: '7rem', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}
              endIcon={<img src="/btn_next.png" alt="Next" style={{ width: '1rem', height: '1rem' }}  />} onClick={handlebtnNext}>Next</Button> : null}
        </Box>
      </Box>


      <Box sx={{ display: 'flex',  marginLeft: '5%', marginRight: '5%',marginBottom: '1rem'  }}>
      <Box sx={{  width: '100%' }}>
        <Box sx={{ border: '1px solid black', borderRadius: '1rem', padding: '0.5rem',  width: '100%' }}>
            <OneListeningTest 
                onelistening={DataListQuestion[indexVisible]} 
                audioRef={audioRef} 
                status={status} 
                onAudioEnd={onAudioEnd} 
                title ={title}
                focusId={focusId}
            />
        </Box>
        </Box>
        {status === 'Submit' && (
            <Box sx={{ marginLeft:"2rem" }}> 
                <ScoreGrid score={score} gridData={gridData} serials ={getListSerialQuestion()} 
                onItemClick ={onItemClick}  onClickTestAgain={onClickTestAgain}/> 
            </Box>
        )}
    </Box>

        {status === 'Testing' && (
          <Box sx={{ display: 'flex', justifyContent: 'center', }}>
          <Button
            sx={{
              border: '0.0001rem solid black',
              borderRadius: '1rem',
              background: '#FFD984',
              color: 'black',
              textAlign: 'center',
              marginBottom: '2%',
              padding: '1rem 2rem'
            }}
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </Box>
        )}
      
      
     
      
    </>
  );
}

function CountdownTimer({setStatus}) {
  const [timeLeft, setTimeLeft] = useState(2*60); 

  useEffect(() => {
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 0) {
          clearInterval(timer);
          setStatus("Submit");
          return 0;
        }
        return prevTime - 1; 
      });
    }, 1000); 


    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
   
    <Typography align="center">
    <strong>Time remaining:</strong>
    <br />
    {minutes} : {seconds < 10 ? `0${seconds}` : seconds} 
  </Typography>
    </>
  );
}





export default TestListening;
