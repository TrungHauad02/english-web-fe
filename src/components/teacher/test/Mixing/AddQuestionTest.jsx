
import { createTestReadingQuestion, updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import { createTestMixingQuestion,updateTestMixingQuestion } from "api/test/TestMixingQuestionApi";
import {createTestListeningQuestion, updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import { createTestSpeakingQuestion,updateTestSpeakingQuestion } from "api/test/TestSpeakingQuestionApi";
import { createTestWriting, updateTestWriting } from 'api/test/TestWritingApi';
import { getTest  } from 'api/test/TestApi';
export  async function AddQuestionTest(idTest, type, testAdd) {

    const test = await getTest(idTest);
    const serialTestAdd = testAdd.serial; 
    let idNew = '';
  
    const testMixingQuestions = test.testMixingQuestions;
    const testListenings = test.testListenings;
    const testReadings = test.testReadings;
    const testWritings = test.testWritings;
    const testSpeakings = test.testSpeakings;
  
    const types = ['VOCABULARY', 'GRAMMAR', 'READING', 'LISTENING', 'SPEAKING', 'WRITING'];
    const startIndex = types.indexOf(type);
  
    try {
      for (let i = startIndex; i < types.length; i++) {
        switch (types[i]) {
          case 'VOCABULARY':
            if (type === 'VOCABULARY') {
              const response = await createTestMixingQuestion(testAdd);
              idNew = response.id;
            }
            break;
          case 'GRAMMAR':
            await Promise.all(testMixingQuestions.map(async (question) => {
                if (question.serial >= serialTestAdd) {
                  question.serial += 1;
                  await updateTestMixingQuestion(question.id, question);
                }
              }));
              if (type === 'GRAMMAR') {
                const response = await createTestMixingQuestion(testAdd);
                idNew = response.id;
              }
            break;
  
          case 'READING':
            await Promise.all(testReadings.map(async (testReading) => {
                await Promise.all(testReading.questions.map(async (question) => {
                  if (question.serial >= serialTestAdd) {
                    question.serial += 1;
                    await updateTestReadingQuestion(question.id, question);
                  }
                }));
              }));
            if (type === 'READING') {
                const response = await createTestReadingQuestion(testAdd);
                idNew = response.id;
              }
            break;
  
          case 'LISTENING':
            await Promise.all(testListenings.map(async (testListening) => {
                await Promise.all(testListening.questions.map(async (question) => {
                  if (question.serial >= serialTestAdd) {
                    question.serial += 1;
                    await updateTestListeningQuestion(question.id, question);
                  }
                }));
              }));
              if (type === 'LISTENING') {
                const response = await createTestListeningQuestion(testAdd);
                idNew = response.id;
              }
            break;
  
          case 'SPEAKING':
            await Promise.all(testSpeakings.map(async (testSpeaking) => {
                await Promise.all(testSpeaking.questions.map(async (question) => {
                  if (question.serial >= serialTestAdd) {
                    question.serial += 1;
                    await updateTestSpeakingQuestion(question.id, question);
                  }
                }));
              }));
              if (type === 'SPEAKING') {
                const response = await createTestSpeakingQuestion(testAdd);
                idNew = response.id;
              }
            break;
  
          case 'WRITING':
            await Promise.all(testWritings.map(async (testWriting) => {
                if (testWriting.serial > serialTestAdd) {
                  testWriting.serial += 1;
                  await updateTestWriting(testWriting.id, testWriting);
                }
              }));
              if (type === 'WRITING') {
                const response = await createTestWriting(testAdd);
                idNew = response.id;
              }
              break;
          default:
            throw new Error('Invalid question type');
        }
      }
    } catch (error) {
      console.error('Error processing the request:', error);
    }    
  
    return idNew;
  }

  
  
