import { deleteTestReadingQuestion, updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import { deleteTestMixingQuestion, updateTestMixingQuestion } from "api/test/TestMixingQuestionApi";
import { deleteTestListeningQuestion, updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import { deleteTestSpeakingQuestion, updateTestSpeakingQuestion } from "api/test/TestSpeakingQuestionApi";
import { deleteTestReading, updateTestReading } from 'api/test/TestReadingApi';
import { deleteTestWriting, updateTestWriting } from 'api/test/TestWritingApi';
import { deleteTestSpeaking, updateTestSpeaking } from 'api/test/TestSpeakingApi';
import { getTest  } from 'api/test/TestApi';
import { deleteTestListening, updateTestListening } from "api/test/TestListeningApi";
export async function DeleteQuestionTest(idtest, type, testDelete, serialQuestionUpdateOfQuestionMaxTest,minus) {
    const test = await getTest(idtest);

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
                        await deleteTestMixingQuestion(testDelete.id);
                    }
                    break;
                case 'GRAMMAR':
                    await Promise.all(testMixingQuestions.map(async (question) => {
                        if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                            question.serial -= minus;
                            await updateTestMixingQuestion(question.id, question);
                        }
                    }));
                    if (type === 'GRAMMAR') {
                        await deleteTestMixingQuestion(testDelete.id);
                    }
                    break;
                case 'READING':
                    await Promise.all(testReadings.map(async (testReading) => {
                        await Promise.all(testReading.questions.map(async (question) => {
                            if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                             
                            
                                question.serial -= minus;
                                await updateTestReadingQuestion(question.id, question);
                        
                            }
                        }));
                    }));
                    if (type === 'READING') {
                        if (testDelete.test === true) {
                            deleteTestReading(testDelete.id);
                            await Promise.all(testReadings.map(async (testReading) => {
                                if(testReading.serial>testDelete.serial)
                                {
                                    testReading.serial -=1;
                                    await updateTestReading(testReading.id,testReading);
                                }
                            }));
                            if(serialQuestionUpdateOfQuestionMaxTest===-1)
                            {
                                return;
                            }
                            
                        } 
                        else {
                            
                            await deleteTestReadingQuestion(testDelete.id);
                        }
                    }
                    break;
                case 'LISTENING':
                    await Promise.all(testListenings.map(async (testListening) => {
                        await Promise.all(testListening.questions.map(async (question) => {
                            if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                          
                                question.serial -= minus;
                                await updateTestListeningQuestion(question.id, question);
                           
                            }
                        }));
                    }));
                    if (type === 'LISTENING') {
                        if (testDelete.test === true) {
                            deleteTestListening(testDelete.id);
                            await Promise.all(testListenings.map(async (testListening) => {
                                if(testListening.serial>testDelete.serial)
                                {
                                    testListening.serial -=1;
                                    await updateTestListening(testListening.id,testListening);
                                }
                            }));
                            if(serialQuestionUpdateOfQuestionMaxTest===-1)
                            {
                                return;
                            }
                            
                        } 
                        else {
                            
                            await deleteTestListeningQuestion(testDelete.id);
                        }
                    }
                    break;
                case 'SPEAKING':
                    await Promise.all(testSpeakings.map(async (testSpeaking) => {
                        await Promise.all(testSpeaking.questions.map(async (question) => {
                            if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                                question.serial -= minus;
                                await updateTestSpeakingQuestion(question.id, question);
                            }
                        }));
                    }));
                    if (type === 'SPEAKING') {
                        if (testDelete.test === true) {
                            deleteTestSpeaking(testDelete.id);
                            await Promise.all(testSpeakings.map(async (testSpeaking) => {
                                if(testSpeaking.serial>testDelete.serial)
                                {
                                    testSpeaking.serial -=1;
                                    await updateTestSpeaking(testSpeaking.id,testSpeaking);
                                }
                            }));
                            if(serialQuestionUpdateOfQuestionMaxTest===-1)
                            {
                                return;
                            }
                            
                        } 
                        else {
                            
                            await deleteTestSpeakingQuestion(testDelete.id);
                        }
                    }
                    break;
                case 'WRITING':
                    await Promise.all(testWritings.map(async (testWriting) => {
                        if (testWriting.serial > serialQuestionUpdateOfQuestionMaxTest) {
                            testWriting.serial -= minus;
                            await updateTestWriting(testWriting.id, testWriting);
                        }
                    }));
                    if (type === 'WRITING') {
                        await deleteTestWriting(testDelete.id);
                    }
                    break;
                default:
                    throw new Error('Invalid question type');
            }
        }
    } catch (error) {
        console.error('Error processing the request:', error);
    }
}
