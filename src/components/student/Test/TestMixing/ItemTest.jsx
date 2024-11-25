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
import {createSubmitTest} from "../../../../api/test/submitTest"
import { fetchUserInfo } from "../../../../api/user/userService";
import {createSubmitTestReadingAnswer} from "../../../../api/test/submitTestReadingAnswer"
import {commentMixingQuestion,commentReadingQuestion,commentListeningQuestion} from "../../../../api/test/commentTest"


const ItemTest = ({ title, datatest,setStatus,setSubmitTest }) => {
  const DataTestMixing = [
    {
      title: "Vocabulary",
      questions: datatest?.testMixingQuestions.filter(
        (question) => question.type === "VOCABULARY"
      ) || [],
      testId: datatest.id,
    },
    {
      title: "Grammar",
      questions: datatest?.testMixingQuestions.filter(
        (question) => question.type === "GRAMMAR"
      ) || [],
      testId: datatest.id,
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
      title: "Speaking",
      dataitem: datatest?.testSpeakings || [],
    },
    {
      title: "Writing",
      dataitem: datatest?.testWritings || [],
    },
 
  ];

  const [answers, setAnswers] = useState({});
  useEffect(() => {
    openDB('MyDatabase', 'MyStore' + datatest.id).then((db) => {
        getData(db, 'MyStore' + datatest.id).then(setAnswers);
    }).catch((error) => {
        console.error('Error accessing the database:', error);
    });
}, [datatest.id]);

useEffect(() => {
    openDB('MyDatabase', 'MyStore'+datatest.id).then((db) => saveData(db, 'MyStore'+datatest.id, answers));
}, [answers]);

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
          data.dataitem.forEach((item) => {
            item.questions.forEach((question) => {
              serialsForCurrentTitle.push(question.serial);
            });
          });
        

        TitleAndSerials.serials.push(serialsForCurrentTitle);
      } else if (data.title === "Writing") {
        TitleAndSerials.title.push(data.title);
        const serialsForCurrentTitle = [];
        data.dataitem.forEach((item) => {
      
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
        console.log(TitleAndSerials);
        
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
      return (data.questions || []).map((question) => {
        if (!question || !question.answers) {
          console.log(data.title,"tan",question.id);
          
          console.warn("Question or answers array is undefined");
          return -1;
        }

        const correctAnswer = question.answers.find((answer) => answer.isCorrect);
        const selectedAnswer = answers[question.id];

        if (selectedAnswer === undefined) {
          return -1;
        }
        return correctAnswer && selectedAnswer === correctAnswer.id ? 1 : 0;
      });
    } else if (data.title === "Reading" || data.title === "Listening") {
      return (data.dataitem || []).flatMap((item) => {
        if (!item || !item.questions) {
          console.warn("Item or questions array is undefined");
          return -1;
        }

        return item.questions.map((question) => {
          if (!question || !question.answers) {
            console.warn("Question or answers array is undefined");
            return -1;
          }

          const correctAnswer = question.answers.find((answer) => answer.isCorrect);
          const selectedAnswer = answers[question.id];

          if (selectedAnswer === undefined) {
            return -1;
          }
          return correctAnswer && selectedAnswer === correctAnswer.id ? 1 : 0;
        });
      });
    } else if (data.title === "Speaking") {
      return (data.dataitem || []).flatMap((item) => {
        if (!item || !item.questions) {
          console.warn("Item or questions array is undefined");
          return -1;
        }

        return item.questions.map((question) => {
          const selectedAnswer = answers[question.id];

          if (selectedAnswer === undefined) {
            return -1;
          }
          return 1; // Chỉ trả về 1 vì không có correctAnswer để so sánh
        });
      });
    } else if (data.title === "Writing") {
      return (data.dataitem || []).flatMap((item) => {
        const selectedAnswer = answers[item.id];

        if (selectedAnswer === undefined || selectedAnswer.essay === '') {
          return -1;
        }
        return 1;
      });
    } else {
      return [];
    }
  });
};


  const [gridData, setGridData] = useState(generateGridData());


  useEffect(() => {
    setGridData(generateGridData());
  }, [answers]);


  const [renderKey, setRenderKey] = useState(0);

  const submitTest = async () => {

    let user =  await fetchUserInfo();
    const submitTest = getDataSubmitTest();
    submitTest.userId = user.id;
  };

  const getDataSubmitTest = async () => {
    let submitTest = {
      id: '',
      testId: datatest.id,
      userId: '',
      score: '',
      submitTime: new Date().toISOString(),
      status: 'ACTIVE',
      submitTestListeningAnswers: [],
      submitTestReadingAnswers: [],
      submitTestWritings: [],
      submitTestSpeakings: [],
      submitTestMixingAnswers: [],
    };
  
    for (const data of DataTestMixing) {
      if (data.title === "Vocabulary" || data.title === "Grammar") {
        for (const question of data.questions) {
          if (!question || !question.answers) {
            console.warn("Question or answers array is undefined");
            continue; // Skip this question if data is not valid
          }
  
          const selectedAnswer = answers[question.id];
          let submitTestMixingAnswer = {
            id: '',
            submitTestId: '',
            questionId: question.id,
            answerId: selectedAnswer !== undefined ? selectedAnswer : '',
            comment: '',
            status: 'ACTIVE',
          };
  
          if (selectedAnswer !== undefined) {

            const answersContentList = question.answers.map((answer) => answer.content);
            const userAnswerContent = question.answers?.find((answer) => answer.id === selectedAnswer)?.content || '';
            try {
              const request = {
                questionContent: question.content,
                answers: answersContentList,
                userAnswer: userAnswerContent,
              };
              const response = await commentMixingQuestion(request);
              submitTestMixingAnswer.comment = response.comment;
            } catch (error) {
              console.error("Failed to get comment for mixing question:", error);
            }
          }
  
          submitTest.submitTestMixingAnswers.push(submitTestMixingAnswer);
        }
      } else if (data.title === "Reading" || data.title === "Listening") {
        for (const item of data.dataitem) {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            continue;
          }
  
          for (const question of item.questions) {
            if (!question || !question.answers) {
              console.warn("Question or answers array is undefined");
              continue; 
            }
  
            const selectedAnswer = answers[question.id];
            let submitAnswer = {
              id: '',
              submitTestId: '',
              questionId: question.id,
              answerId: selectedAnswer !== undefined ? selectedAnswer : '',
              comment: '',
              status: 'ACTIVE',
            };
  
            if (selectedAnswer !== undefined) {

              const answersContentList = question.answers.map((answer) => answer.content);
              const userAnswerContent = question.answers?.find((answer) => answer.id === selectedAnswer)?.content || '';
  
              try {
                const request = {
                  questionContent: question.content,
                  answers: answersContentList,
                  userAnswer: userAnswerContent,
                };
  
                if (data.title === "Reading") {
                  request.readingContent = item.content;
                  const response = await commentReadingQuestion(request);
                  submitAnswer.comment = response.comment;
                } else if (data.title === "Listening") {
                  request.listeningTranscript = item.transcript;
                  const response = await commentListeningQuestion(request);
                  submitAnswer.comment = response.comment;
                }
              } catch (error) {
                console.error(`Failed to get comment for ${data.title.toLowerCase()} question:`, error);
              }
            }
  
            if (data.title === "Reading") {
              submitTest.submitTestReadingAnswers.push(submitAnswer);
            } else if (data.title === "Listening") {
              submitTest.submitTestListeningAnswers.push(submitAnswer);
            }
          }
        }
      } else if (data.title === "Speaking") {
        for (const item of data.dataitem) {
          if (!item || !item.questions) {
            console.warn("Item or questions array is undefined");
            continue; // Skip this item if data is not valid
          }
  
          for (const question of item.questions) {
            const selectedAnswer = answers[question.id];
            let submitSpeaking = {
              id: '',
              submitTestId: '',
              testSpeakingQuestionId: question.id,
              content: selectedAnswer !== undefined ? selectedAnswer : '',
              score: '',
              explanation: '',
              comment: '',
              status: 'ACTIVE',
            };
            submitTest.submitTestSpeakings.push(submitSpeaking);
          }
        }
      } else if (data.title === "Writing") {
        for (const item of data.dataitem) {
          if (!item) {
            console.warn("Item is undefined");
            continue; 
          }
  
          const selectedAnswer = answers[item.id];
          let submitWriting = {
            id: '',
            submitTestId: '',
            testWritingId: item.id,
            content: selectedAnswer !== undefined && selectedAnswer.essay !== '' ? selectedAnswer.essay : '',
            score: '',
            comment: '',
            status: 'ACTIVE',
          };
          submitTest.submitTestWritings.push(submitWriting);
        }
      }
    }
    return submitTest;
  };
  
    
  const handlebtnSubmit = async () => {
  
 
    let temscore = 0;
    DataTestMixing.forEach((data) => {
      if (data.questions) {
        data.questions.forEach((question) => {
          const correctAnswer = question.options?.find((option) => option.isCorrect);
          if (correctAnswer && answers[question.id] === correctAnswer.content) {
            temscore += 1;
          }
        });
      }
    });
    deleteData('MyDatabase', 'MyStore'+datatest.id);
 
    const submitTestData = await getDataSubmitTest();

    setSubmitTest(submitTestData);
    setStatus("Submit");
    
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
        {activeTab === 0 && <Vocabulary key={renderKey}  dataTest={DataTestMixing[activeTab]}  focusId={focusId} title={title}  answers = {answers} setAnswers = {setAnswers} />}
        {activeTab === 1 && <Grammar key={renderKey} dataTest={DataTestMixing[activeTab]} focusId={focusId} title={title}  answers = {answers} setAnswers = {setAnswers} />}
        {activeTab === 2 && <Reading key={renderKey}  dataTest={DataTestMixing[activeTab]} focusId={focusId} title={title}   answers = {answers} setAnswers = {setAnswers} />}
        {activeTab === 3 && <Listening key={renderKey} dataTest={DataTestMixing[activeTab]} focusId={focusId} title={title}   answers = {answers} setAnswers = {setAnswers} />}
        {activeTab === 4 && <Speaking key={renderKey} dataTest={DataTestMixing[activeTab].dataitem} focusId={focusId}  answers = {answers} setAnswers = {setAnswers}   />}
        {activeTab === 5 && <Writing key={renderKey} dataTest={DataTestMixing[activeTab]}  focusId={focusId} title={title}   answers = {answers} setAnswers = {setAnswers} />}
      
      </Box>

      <Box sx={{ width: '25%',marginLeft:'1rem' }}> 
        <SerialGrid
          title={DataTestMixing[activeTab].title}
          TitleAndSerials={TitleAndSerials}
          gridData={gridData}
          onItemClick={onItemClick}
          handlebtnSubmit={handlebtnSubmit}
        />
      </Box>
    </Box>
  </Grid>
  );
};


const openDB = (dbName, storeName) => {
  return new Promise((resolve, reject) => {
      const request = indexedDB.open(dbName);

      request.onsuccess = (event) => {
          const db = event.target.result;

          if (!db.objectStoreNames.contains(storeName)) {
              db.close();
            
              const versionRequest = indexedDB.open(dbName, db.version + 1);

              versionRequest.onupgradeneeded = (upgradeEvent) => {
                  const upgradedDb = upgradeEvent.target.result;
                  upgradedDb.createObjectStore(storeName, { keyPath: 'id' });
                  console.log(`Created object store: ${storeName} in version upgrade`);
              };

              versionRequest.onsuccess = (versionEvent) => {
                  resolve(versionEvent.target.result);
              };

              versionRequest.onerror = (event) => {
                  reject(event.target.error);
              };
          } else {
              resolve(db);
          }
      };

      request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
              db.createObjectStore(storeName, { keyPath: 'id' });
              console.log(`Created object store: ${storeName}`);
          }
      };

      request.onerror = (event) => {
          reject(event.target.error);
      };
  });
};




const saveData = async (db, storeName, data) => {
  const tx = db.transaction(storeName, 'readwrite');
  const store = tx.objectStore(storeName);
  for (const [id, value] of Object.entries(data)) {
      store.put({ id, value });
  }
};

const getData = async (db, storeName) => {
  return new Promise((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => {
          const result = request.result.reduce((acc, item) => {
              acc[item.id] = item.value;
              return acc;
          }, {});
          resolve(result);
      };
      request.onerror = () => reject(request.error);
  });
};
const deleteData = (dbName, storeName, key) => {
  const request = indexedDB.open(dbName);

  request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);

      if (key) {
          store.delete(key);
      } else {
          store.clear();
      }

      transaction.oncomplete = () => {
          console.log('Data deleted successfully');
      };

      transaction.onerror = (event) => {
          console.error('Error deleting data:', event.target.error);
      };
  };

  request.onerror = (event) => {
      console.error('Error opening database:', event.target.error);
  };
};










export default ItemTest;
