import MainTitle from "./MainTitle";
import OneListeningTest from "./OneListeningTest";
import { Box, Typography, Button, duration } from "@mui/material";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import ScoreGrid from "./ScoreGrid";
import { useLocation } from 'react-router-dom';
import { getTestListeningbySerial } from "../../../api/student/test/TestListeningApi"

function TestListening() {
  const location = useLocation();
    const { state } = location; 
    const datatest = state;
    const title = datatest.type;

  const [status, setStatus] = useState('Begin');
  const [renderKey, setRenderKey] = useState(0);
  const [testvisiable, setTestvisiable] = useState(0);
  const onClickTestAgain = () => {
    localStorage.removeItem('selectedAnswers' + datatest.type);
    setStatus('Testing');

    setRenderKey(renderKey + 1);
};

  const audioRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTestListeningbySerial(datatest.id);
      const test = data;
      console.log(data);
           
      if (test) {
        setTestvisiable(test);
      } else {
          
      }
    };

    fetchData();
  }, [testvisiable]);

  return (
    <Box>
      <MainTitle title={datatest.type} bg="/bg_test.png" />
      {status === 'Begin'
        ? <IntroduceTest setStatus={setStatus} datatest= {datatest}/>
        : <TestingListening key={renderKey} audioRef={audioRef} status={status} setStatus={setStatus} title={title}
        onClickTestAgain ={onClickTestAgain} data ={testvisiable} duration={datatest.duration}
        />
        
      }
    </Box>
  );
}

function IntroduceTest({ setStatus,datatest }) {
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
        Thời gian làm bài:  {datatest.duration} phút
      </Typography>
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#ACCD0A',
          '&:hover': { backgroundColor: '#8CAB0A' }
        }}
        onClick={() => setStatus('Testing')}
      >
        Bắt đầu {datatest.question}
      </Button>
    </Box>

    </Box>
   
  );
}

function TestingListening({ audioRef, status, setStatus,title,onClickTestAgain,data,duration}) {
  const [indexVisible, setIndexVisible] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0); 
  const [gridData, setGridData] = useState([]); 
  const [focusId,setfocusId] = useState();



  const onAudioEnd = () => {
    if (data.length > indexVisible + 1) {
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
      if (data.length > prevIndex + 1) {
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

    if (!Array.isArray(data)) {
      console.error("DataListQuestion is not an array");
      return score;
    }

    data.forEach((dataitem) => {
      dataitem.questions.forEach((question) => {
        const correctAnswer = question.answers.find(answer => answer.isCorrect);
        if (correctAnswer && selectedAnswers[question.id] === correctAnswer.content) {
          score += 1;
        }
      });
    });

    return score;
  };

  const generateGridData = () => {
   
    return data.flatMap(dataitem =>
      dataitem.questions.map(question => {
        const correctAnswer = question.answers.find(answer => answer.isCorrect);
        const selectedAnswer = selectedAnswers[question.id];
    
   
        if (selectedAnswer === undefined) {

          return -1; 
          
        }
        return selectedAnswer === correctAnswer.content ? 1 : 0; 
      })
    );
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
          <CountdownTimer duration={duration} setStatus={setStatus}/>
        </Box>
     )}
   
    
      <Box sx={{ marginTop: '5%', marginBottom: '1rem', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'center', marginLeft: '5%', marginRight: status === 'Submit' ? '25%' : '5%', }}>
        <Box sx={{ display: 'flex', mt: 5, marginLeft: '5%', width: '45%', justifyContent: 'center' }}>
          {status === 'Submit'
            ? <Button variant="contained" sx={{ background: '#ACCD0A', padding: '0.5rem', width: '7rem', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}
              startIcon={<img src="/btn_previous.png" alt="Previous" style={{ width: '1rem', height: '1rem' }} />} onClick={handlebtnPrevious}  >Previous</Button>
            : null}
          <Box variant="body1" sx={{ mx: 2, background: '#FFF4CC', padding: '0.5rem 2rem', textAlign: 'center', alignContent: 'center', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}>{(indexVisible + 1)}/{data.length}</Box>
          {status === 'Submit'
            ? <Button variant="contained" sx={{ background: '#ACCD0A', padding: '0.5rem 1rem', width: '7rem', fontSize: '1rem', fontFamily: 'Roboto', fontWeight: '500' }}
              endIcon={<img src="/btn_next.png" alt="Next" style={{ width: '1rem', height: '1rem' }}  />} onClick={handlebtnNext}>Next</Button> : null}
        </Box>
      </Box>


      <Box sx={{ display: 'flex',  marginLeft: '5%', marginRight: '5%',marginBottom: '1rem'  }}>
      <Box sx={{  width: '100%' }}>
        <Box sx={{ border: '1px solid black', borderRadius: '1rem', padding: '0.5rem',  width: '100%' }}>
            <OneListeningTest 
                onelistening={data[indexVisible]} 
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

function CountdownTimer({ setStatus, duration }) {
  const [timeLeft, setTimeLeft] = useState(() => duration); // Khởi tạo với giá trị 
 (
  console.log(duration)
  
 )
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
