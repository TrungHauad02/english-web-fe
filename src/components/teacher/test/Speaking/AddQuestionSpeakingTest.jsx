import { createTestSpeakingQuestion, updateTestSpeakingQuestion } from "api/test/TestSpeakingQuestionApi";
import { getTest } from 'api/test/TestApi';

export async function AddQuestionSpeakingTest(idTest, testAdd) {
  const test = await getTest(idTest);
  const serialTestAdd = testAdd.serial;
  let idNew = '';
  const testSpeakings = test.testSpeakings;
  const updatePromises = [];

  testSpeakings.forEach(testSpeaking => {
    testSpeaking.questions.forEach(question => {
      if (question.serial >= serialTestAdd) {
        question.serial += 1;
        updatePromises.push(updateTestSpeakingQuestion(question.id, question));
      }
    });
  });
  await Promise.all(updatePromises);
  const response = await createTestSpeakingQuestion(testAdd);
  idNew = response.id;

  return idNew;
}
