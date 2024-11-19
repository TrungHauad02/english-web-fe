import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Grid, styled } from '@mui/material';
import ItemTitleTest from '../ItemTitleTest';
import Vocabulary from './SubmitVocabulary';
import Grammar from './SubmitGrammar';
import Reading from './SubmitReading';
import Listening from './SubmitListening';
import Writing from './SubmitWriting';
import Speaking from './SubmitSpeaking';
import SerialGrid from './SerialGrid/SerialGrid';

const SubmitTestMixing = ({datatest, submitTest ,onClickTestAgain}) => {
  const DataTestMixing = [
    {
      title: "Vocabulary",
      questions: datatest?.testMixingQuestions.filter(
        (question) => question.type === "VOCABULARY"
      ) || [],
      submitTestMixingAnswers: submitTest.submitTestMixingAnswers,
    },
    {
      title: "Grammar",
      questions: datatest?.testMixingQuestions.filter(
        (question) => question.type === "GRAMMAR"
      ) || [],
      submitTestMixingAnswers: submitTest.submitTestMixingAnswers,
    },
    {
      title: "Reading",
      testReadings: datatest?.testReadings || [],
      submitTestReadingAnswers: submitTest.submitTestReadingAnswers
    },
    {
      title: "Listening",
      testListenings: datatest?.testListenings || [],
      submitTestListeningAnswers: submitTest.submitTestListeningAnswers
    },
    {
      title: "Speaking",
      testSpeakings: datatest?.testSpeakings || [],
      submitTestSpeakings: submitTest.submitTestSpeakings
    },
    {
      title: "Writing",
      testWritings: datatest?.testWritings || [],
      submitTestWritings: submitTest.submitTestWritings
    },
 
  ];

  const getListSerialTest = () => {
    const TitleAndSerials = {
      title: [],
      serials: [],
    };

    DataTestMixing.forEach((data) => {
      if (data.title === "Vocabulary" || data.title === "Grammar") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];

        data.questions.forEach((question) => {
          serialsForCurrentTitle.push(question.serial);
        });

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } else if (data.title === "Reading") {

        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
          data.testReadings.forEach((item) => {
            item.questions.forEach((question) => {
              serialsForCurrentTitle.push(question.serial);
            });
          });
        

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      }
      else if (data.title === "Listening" ) {

        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
          data.testListenings.forEach((item) => {
            item.questions.forEach((question) => {
              serialsForCurrentTitle.push(question.serial);
            });
          });
        

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } 
      else if ( data.title === "Speaking") {

        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
          data.testSpeakings.forEach((item) => {
            item.questions.forEach((question) => {
              serialsForCurrentTitle.push(question.serial);
            });
          });
        

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } 


       else if (data.title === "Writing") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
        data.testWritings.forEach((item) => {
      
            serialsForCurrentTitle.push(item.serial);

        });
        TitleAndSerials.serials.push(serialsForCurrentTitle);
      }
    });
    
    return TitleAndSerials;
  };

  const [focusId, setfocusId] = useState();
  const [activeTab, setActiveTab] = useState(0);
  const TitleAndSerials = getListSerialTest();

  const onItemClick = useCallback(
    (serial) => {
      for (let index = 0; index < TitleAndSerials.title.length; index++) {
        const serials = TitleAndSerials.serials[index];
        if (serials && serials.includes(serial)) {
          setfocusId(serial);
          setActiveTab(index);
          break;
        }
      }
    },
    [TitleAndSerials]
  );

  const [score, setScore] = useState(0);

  const generateGridData = () => {

    return DataTestMixing.flatMap((data) => {
        if (data.title === "Vocabulary" || data.title === "Grammar") {
            return data.questions?.map((question) => {
                if (!question || !question.id || !question.answers) {
                    console.warn("Invalid question or missing ID/answers:", question);
                    return -1; 
                }
            
                const correctAnswer = question.answers.find((answer) => answer?.isCorrect);
                const selectedAnswer = data.submitTestMixingAnswers?.find(
                    (submit) => submit?.questionId === question.id
                )?.answerId;
            
                if (selectedAnswer === undefined || !correctAnswer) {
                    return -1;
                }
            
                return selectedAnswer === correctAnswer.id ? 1 : -1;
            }) || [];
        } else if (data.title === "Reading") {
            return data.testReadings?.flatMap((item) => {
                if (!item || !item.questions) {
                    console.warn("Invalid item or missing questions in Reading:", item);
                    return [];
                }
        
                return item.questions.map((question) => {
                    if (!question || !question.id || !question.answers) {
                        console.warn("Invalid question or missing ID/answers in Reading:", question);
                        return -1;
                    }
        
                    const correctAnswer = question.answers.find((answer) => answer?.isCorrect);
                    const selectedAnswer = data.submitTestReadingAnswers?.find(
                        (submit) => submit?.questionId === question.id
                    )?.answerId;
        
                    if (selectedAnswer === undefined) {
                        console.warn("Selected answer is undefined for question ID:", question.id);
                        return -1;
                    }
        
                    return selectedAnswer === correctAnswer?.id ? 1 : -1;
                }) || [];
            }) || [];
        } else if (data.title === "Listening") {
            return data.testListenings?.flatMap((item) => {
                if (!item || !item.questions) {
                    console.warn("Invalid item or missing questions in Listening:", item);
                    return [];
                }
        
                return item.questions.map((question) => {
                    if (!question || !question.id || !question.answers) {
                        console.warn("Invalid question or missing ID/answers in Listening:", question);
                        return -1;
                    }
        
                    const correctAnswer = question.answers.find((answer) => answer?.isCorrect);
                    const selectedAnswer = data.submitTestListeningAnswers?.find(
                        (submit) => submit?.questionId === question.id
                    )?.answerId;
        
                    if (!correctAnswer || selectedAnswer === undefined) {
                        console.warn("Invalid correct answer or selected answer is undefined:", question);
                        return -1;
                    }
        
                    return selectedAnswer === correctAnswer.id ? 1 : -1;
                }) || [];
            }) || [];
        } else if (data.title === "Speaking") {
            return data.testSpeakings?.flatMap((item) => {
                if (!item || !item.questions) {
                    console.warn("Invalid item or missing questions in Speaking:", item);
                    return [];
                }
        
                return item.questions.map((question) => {
                    if (!question || !question.id) {
                        console.warn("Invalid question or missing ID in Speaking:", question);
                        return -1;
                    }
        
                    const Answer = data.submitTestSpeakings?.find(
                        (submit) => submit?.testSpeakingQuestionId === question.id
                    )?.content;
        
                    if (Answer === undefined || Answer === '') {
                        console.warn("Answer is undefined or empty for question ID:", question.id);
                        return -1;
                    }
                    return 1;
                }) || [];
            }) || [];
        } else if (data.title === "Writing") {
            return data.testWritings?.flatMap((item) => {
                if (!item || !item.id) {
                    console.warn("Invalid item or missing ID in Writing:", item);
                    return -1;
                }
        
                const Answer = data.submitTestWritings?.find(
                    (submit) => submit?.testWritingId === item.id
                )?.content;
        
                if (Answer === undefined || Answer === '') {
                    console.warn("Answer is undefined or empty for item ID:", item.id);
                    return -1;
                }
                return 1;
            }) || [];
        } else {
            return [];
        }
        
    });
};


  const [gridData, setGridData] = useState(generateGridData());

  return (
    <Grid sx={{ marginBottom: '1rem' }} >
    <Box sx={{ marginBottom: '1rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '1rem' }}>
        {DataTestMixing.map((tab, index) => (
          <Box
            key={index}
            sx={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              background: activeTab === index ? '#D9D9D9' : '#d9d9d933',
              cursor: 'pointer',
            }}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </Box>
        ))}
      </Box>
    </Box>

    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Box 
        sx={{
          width: '100%',
          padding: '2rem',
          border: '1px solid #ccc',
          borderRadius: '1rem',
        }}
      >
        <ItemTitleTest title={DataTestMixing[activeTab].title} />
        {activeTab === 0 && <Vocabulary  dataTest={DataTestMixing[activeTab]} focusId={focusId}/>}
        {activeTab === 1 && <Grammar dataTest={DataTestMixing[activeTab]} focusId={focusId}  />}
        {activeTab === 2 && <Reading dataTest={DataTestMixing[activeTab]}  focusId={focusId}  />}
        {activeTab === 3 && <Listening dataTest={DataTestMixing[activeTab]}  focusId={focusId}  />}
        {activeTab === 4 && <Speaking  testSpeakingList={DataTestMixing[activeTab].testSpeakings} submitTestSpeakingList = {DataTestMixing[activeTab].submitTestSpeakings} focusedSerial={focusId}  />}
        {activeTab === 5 && <Writing   testWritingList={DataTestMixing[activeTab].testWritings} submitTestWritingList = {DataTestMixing[activeTab].submitTestWritings} focusedSerial={focusId}  />}


    
      </Box>

      <Box sx={{ width: '25%',marginLeft:'1rem' }}> 
        <SerialGrid
          title={DataTestMixing[activeTab].title}
          TitleAndSerials={TitleAndSerials}
          gridData={gridData}
          onItemClick={onItemClick}
          onClickTestAgain={onClickTestAgain}
          score={score}
        />
      </Box>
    </Box>
  </Grid>
  );
};

export default SubmitTestMixing;
