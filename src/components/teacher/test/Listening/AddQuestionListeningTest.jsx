import { createTestListeningQuestion, updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import { getTest } from 'api/test/TestApi';

export async function AddQuestionListeningTest(idTest, testAdd) {
  const test = await getTest(idTest);
  const serialTestAdd = testAdd.serial;
  let idNew = '';
  const testListenings = test.testListenings;
  const updatePromises = [];

  testListenings.forEach(testListening => {
    testListening.questions.forEach(question => {
      if (question.serial >= serialTestAdd) {
        question.serial += 1;
        updatePromises.push(updateTestListeningQuestion(question.id, question));
      }
    });
  });
  await Promise.all(updatePromises);
  const response = await createTestListeningQuestion(testAdd);
  idNew = response.id;

  return idNew;
}
