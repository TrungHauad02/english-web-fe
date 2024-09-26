    import React, { useState ,useCallback} from 'react';
    import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';
    import DataTestMixing from './DataTestMixing/DataTestMixing'
    import ItemTitleTest from './ItemTitleTest'

    import Vocabulary from './Vocabulary';
    import Grammar from './Grammar';
    import SerialGrid from './SerialGrid/SerialGrid';


    const getListSerialTest = () => {
      const TitleAndSerials = {
          title: [],
          serials: [],
      }; DataTestMixing.forEach(data => {
    
        TitleAndSerials.title.push(data.title);
    
        const serialsForCurrentTitle = [];
      
        data.questions.forEach(question => {
            serialsForCurrentTitle.push(question.serial);
        });
        TitleAndSerials.serials.push(serialsForCurrentTitle);
    });
      return TitleAndSerials; 
  };

  
    const ItemTest = () => {
    const [focusId,setfocusId] = useState();
    const [activeTab, setActiveTab] = useState(0);
    const TitleAndSerials = getListSerialTest();

    const onItemClick = useCallback((serial) => {
      for (let index = 0; index < TitleAndSerials.title.length; index++) {
        const serials = TitleAndSerials.serials[index];
    
        if (serials && serials.includes(serial)) {
          setfocusId(serial);
          setActiveTab(index);
          break; 
        }
      }
    }, [TitleAndSerials]);
    

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [score, setScore] = useState(0); 

    const generateGridData = () => {
   
        return DataTestMixing.flatMap(data =>
          data.questions.map(question => {
            const correctAnswer = question.options.find(option => option.isCorrect);
            const selectedAnswer = selectedAnswers[question.id];
       
            if (selectedAnswer === undefined) {
    
              return -1; 
            }
            return selectedAnswer === correctAnswer.content ? 1 : 0; 
          })
        );
      };
    const [gridData, setGridData] = useState(generateGridData()); 
    const handleAnswerChange = (questionId, answer) => {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answer,
      }));
      setGridData(generateGridData());
    };

    return (
    
        <Box >
        <Box sx={{ display: 'flex', cursor: 'pointer' }}>
            {DataTestMixing.map((tab, index) => (
            <Box
                key={index}
                sx={{
                padding: '10px',
                borderRadius: '1rem',
                background: activeTab === index ? '#D9D9D9' : '#d9d9d933',
                }}
                onClick={() => setActiveTab(index)}
            >
                {tab.title}
            </Box>
            ))}
        </Box>
        <Box sx={{display:'flex',marginBottom:'2%',marginTop:'1rem'}}>
        <Box sx={{ width:'100%',padding: '20px', border: '1px solid #ccc', borderRadius:'1rem' , marginRight:'1rem'}}>
        <ItemTitleTest title={DataTestMixing[activeTab].title}/>
        {activeTab === 0 && <Vocabulary status={"Testing"} dataTest={DataTestMixing[activeTab]}onAnswerChange = {handleAnswerChange} focusId={focusId} />}
        {activeTab === 1 && <Grammar status={"Testing"} dataTest={DataTestMixing[activeTab]}onAnswerChange = {handleAnswerChange}  focusId={focusId}  />}
        </Box>
        <Box>
        <SerialGrid  title={DataTestMixing[activeTab].title} TitleAndSerials = {getListSerialTest()} gridData= {gridData} onItemClick={onItemClick}/>
        </Box>
   
        </Box>
        </Box>
    );
    };

    export default ItemTest;
