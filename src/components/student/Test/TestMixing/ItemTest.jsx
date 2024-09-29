    import React, { useState ,useCallback,useEffect} from 'react';
    import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl,Button,Grid,styled   } from '@mui/material';
    import DataTestMixing from './DataTestMixing/DataTestMixing'
    import ItemTitleTest from './ItemTitleTest'


    import Vocabulary from './Vocabulary';
    import Grammar from './Grammar';
    import Reading from './Reading';
    import Listening from './Listening';
    import Writing from './Writing';
    import SerialGrid from './SerialGrid/SerialGrid';


    const getListSerialTest = () => {
      const TitleAndSerials = {
          title: [],
          serials: [],
      }; 
      DataTestMixing.forEach(data => {
    
        if (data.title === "Vocabulary" 
          || data.title === "Grammar" 

        ) {
          TitleAndSerials.title.push(data.title);
  
          const serialsForCurrentTitle = [];
        
          data.questions.forEach(question => {
              serialsForCurrentTitle.push(question.serial);
          });
  
          TitleAndSerials.serials.push(serialsForCurrentTitle);
      }
      if (data.title === "Reading" 
        || data.title === "Listening" 

      ) {
        TitleAndSerials.title.push(data.title);

        const serialsForCurrentTitle = [];
      
        data.dataitem.forEach(item => {
          item.questions.forEach(question => {
            serialsForCurrentTitle.push(question.serial);
        });
        });
        
       
        TitleAndSerials.serials.push(serialsForCurrentTitle);
    }
     if (data.title === "Writing"
  
        ) {
          TitleAndSerials.title.push(data.title);

          const serialsForCurrentTitle = [];
          serialsForCurrentTitle.push(data.dataitem[0].serial)
          TitleAndSerials.serials.push(serialsForCurrentTitle);
        }
        
    });
      return TitleAndSerials; 
  };

  
    const ItemTest = (title) => {
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
    const [status, setStatus] = useState('Testing'); 
    const [score, setScore] = useState(0); 

    const generateGridData = () => {
      return DataTestMixing.flatMap(data => {
        if (data.title === "Vocabulary"
           || data.title === "Grammar"
        ) {
          return data.questions.map(question => {
            const correctAnswer = question.options.find(option => option.isCorrect);
            const selectedAnswer = selectedAnswers[question.id];
    
            if (selectedAnswer === undefined) {
              return -1; 
            }
            return selectedAnswer === correctAnswer.content ? 1 : 0; 
          });
        } else  if (data.title === "Reading"
          || data.title === "Listening"
       )  {
          return data.dataitem.flatMap(item => {
            return item.questions.map(question => {
              const correctAnswer = question.options.find(option => option.isCorrect);
              const selectedAnswer = selectedAnswers[question.id];
    
              if (selectedAnswer === undefined) {
                return -1; 
              }
              return selectedAnswer === correctAnswer.content ? 1 : 0; 
            });
          });
        } else  if (data.title === "Writing"
       ) {
   
            const selectedAnswer = selectedAnswers[data.dataitem[0].id].essay;

            
             if(selectedAnswer===undefined || selectedAnswer==='')
            { 
              return [-1]; 
            }
            return [0];

       }
       else {
          return [];
        }
      });
    };
    
    
    
    const [gridData, setGridData] = useState(generateGridData()); 
    
    const handleAnswerChange = () => {
      const savedAnswers = localStorage.getItem('selectedAnswers'+title);
      if (savedAnswers) {
          setSelectedAnswers(JSON.parse(savedAnswers));
      }
    };
    useEffect(() => {
      const savedAnswers = localStorage.getItem('selectedAnswers'+title);
      if (savedAnswers) {
          setSelectedAnswers(JSON.parse(savedAnswers));
      }
  
       setGridData(generateGridData());
    }, [selectedAnswers]);


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
      let temscore=0;
      DataTestMixing.forEach((data) => {
        data.questions.forEach((question) => {
          const correctAnswer = question.options.find(option => option.isCorrect);
          if (correctAnswer && selectedAnswers[question.id] === correctAnswer.content) {
            temscore += 1;
          }
        });
      });
      setScore(temscore);

      
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
        <Box sx={{ width:'100%',padding: '2rem', border: '1px solid #ccc', borderRadius:'1rem' , marginRight:'1rem'}}>
        <ItemTitleTest title={DataTestMixing[activeTab].title}/>
        {activeTab === 0 && <Vocabulary key= {renderKey} status={status} dataTest={DataTestMixing[activeTab]}onAnswerChange = {handleAnswerChange} focusId={focusId} title= {title} />}
        {activeTab === 1 && <Grammar key= {renderKey}  status={status} dataTest={DataTestMixing[activeTab]}onAnswerChange = {handleAnswerChange}  focusId={focusId} title= {title}   />}
        {activeTab === 2 && <Reading key= {renderKey}  status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange = {handleAnswerChange}  focusId={focusId} title= {title}   />}
        {activeTab === 3 && <Listening key= {renderKey}  status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange = {handleAnswerChange}  focusId={focusId} title= {title}   />}
        {activeTab === 4 && <Writing key= {renderKey}  status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange = {handleAnswerChange}  focusId={focusId} title= {title}   />}
        </Box>
        <Box sx={{width:'25%'}}>
        <SerialGrid  title={DataTestMixing[activeTab].title} TitleAndSerials = {TitleAndSerials} gridData= {gridData} onItemClick={onItemClick} 
        status = {status} handlebtnSubmit ={handlebtnSubmit} 
        onClickTestAgain={onClickTestAgain} 
        score ={score}
        />
        </Box>
   
        </Box>
        </Box>
    );
    };

    export default ItemTest;
