import React, { useState, useCallback, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Button, Grid, styled } from '@mui/material';
import ItemTitleTest from './ItemTitleTest';
import Vocabulary from './Vocabulary';
import Grammar from './Grammar';
import Reading from './Reading';
import Listening from './Listening';
import Writing from './Writing';
import Speaking from './Speaking';
import SerialGrid from './SerialGrid/SerialGrid';

const ItemTest = ({ title, datatest }) => {
  const DataTestMixing = [
    {
      title: "Vocabulary",
      questions: datatest?.testVocabularyQuestions || [],
    },
    {
      title: "Grammar",
      questions: datatest?.testGrammarQuestions || [],
    },
    {
      title: "Reading",
      dataitem: datatest?.testReadings || [],
    },
    {
      title: "Listening",
      dataitem: datatest?.testListenings || [],
    },
    {
      title: "Writing",
      dataitem: datatest?.testWritings || [],
    },
    {
      title: "Speaking",
      dataitem: datatest?.testSpeakings || [],
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
      } else if (data.title === "Reading" || data.title === "Listening" || data.title === "Speaking") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];

        if (data.title === "Speaking") {
          data.dataitem.forEach((testItem) => {
            testItem.questions.forEach((question) => {
              serialsForCurrentTitle.push(question.serial);
            });
          });
        } else {
          data.dataitem.forEach((item) => {
            item.questions.forEach((question) => {
              serialsForCurrentTitle.push(question.serial);
            });
          });
        }

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } else if (data.title === "Writing") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
        if (data.dataitem.length > 0) {
          serialsForCurrentTitle.push(data.dataitem[0].serial);
        }
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

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [status, setStatus] = useState('Testing');
  const [score, setScore] = useState(0);

  const generateGridData = () => {
    return DataTestMixing.flatMap((data) => {
      if (data.title === "Vocabulary" || data.title === "Grammar") {
        return data.questions.map((question) => {
          const correctAnswer = question.answers.find((answer) => answer.isCorrect);
          const selectedAnswer = selectedAnswers[question.id];

          if (selectedAnswer === undefined) {
            return -1;
          }
          return selectedAnswer === correctAnswer.content ? 1 : 0;
        });
      } else if (data.title === "Reading" || data.title === "Listening" ) {
        return data.dataitem.flatMap((item) => {
          return item.questions.map((question) => {
            const correctAnswer = question.answers.find((answer) => answer.isCorrect);
            const selectedAnswer = selectedAnswers[question.id];

            if (selectedAnswer === undefined) {
              return -1;
            }
            return selectedAnswer === correctAnswer.content ? 1 : 0;
          });
        });
      } else if (data.title === "Writing") {
        const selectedAnswer = selectedAnswers[data.dataitem[0]?.id];

        if (selectedAnswer && selectedAnswer.essay) {
          console.log(selectedAnswer.essay);
        }

        if (selectedAnswer === undefined || selectedAnswer === '') {
          return [-1];
        }
        return [0];
      } else {
        return [];
      }
    });
  };

  const [gridData, setGridData] = useState(generateGridData());

  const handleAnswerChange = () => {
    const savedAnswers = localStorage.getItem('selectedAnswers' + title);
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
  };
  useEffect(() => {
    const savedAnswers = localStorage.getItem('selectedAnswers' + title);
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
    const savedAnswers = localStorage.getItem('selectedAnswers' + title);

    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
    let temscore = 0;
    DataTestMixing.forEach((data) => {
      if (data.questions) {
        data.questions.forEach((question) => {
          const correctAnswer = question.options?.find((option) => option.isCorrect);
          if (correctAnswer && selectedAnswers[question.id] === correctAnswer.content) {
            temscore += 1;
          }
        });
      }
    });
    setScore(temscore);
  };

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
        {activeTab === 0 && <Vocabulary key={renderKey} status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange={handleAnswerChange} focusId={focusId} title={title} />}
        {activeTab === 1 && <Grammar key={renderKey} status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange={handleAnswerChange} focusId={focusId} title={title} />}
        {activeTab === 2 && <Reading key={renderKey} status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange={handleAnswerChange} focusId={focusId} title={title} />}
        {activeTab === 3 && <Listening key={renderKey} status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange={handleAnswerChange} focusId={focusId} title={title} />}
        {activeTab === 4 && <Writing key={renderKey} status={status} dataTest={DataTestMixing[activeTab]} onAnswerChange={handleAnswerChange} focusId={focusId} title={title} />}
        {activeTab === 5 && <Speaking key={renderKey} status={status} dataTest={DataTestMixing[activeTab].dataitem} focusId={focusId} />}
      </Box>

      <Box sx={{ width: '25%',marginLeft:'1rem' }}> {/* SerialGrid chiếm 25% */}
        <SerialGrid
          title={DataTestMixing[activeTab].title}
          TitleAndSerials={TitleAndSerials}
          gridData={gridData}
          onItemClick={onItemClick}
          status={status}
          handlebtnSubmit={handlebtnSubmit}
          onClickTestAgain={onClickTestAgain}
          score={score}
        />
      </Box>
    </Box>
  </Grid>


  );
};

export default ItemTest;
