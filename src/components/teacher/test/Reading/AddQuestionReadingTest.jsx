import { createTestReadingQuestion, updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import { getTest } from 'api/test/TestApi';

export async function AddQuestionReadingTest(idTest, testAdd) {
  const test = await getTest(idTest);
  const serialTestAdd = testAdd.serial;
  let idNew = '';
  const testReadings = test.testReadings;
  const updatePromises = [];

  testReadings.forEach(testReading => {
    testReading.questions.forEach(question => {
      if (question.serial >= serialTestAdd) {
        question.serial += 1;
        updatePromises.push(updateTestReadingQuestion(question.id, question));
      }
    });
  });
  await Promise.all(updatePromises);
  const response = await createTestReadingQuestion(testAdd);
  idNew = response.id;

  return idNew;
}
