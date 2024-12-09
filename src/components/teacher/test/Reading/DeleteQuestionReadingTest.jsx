import { deleteTestReadingQuestion, updateTestReadingQuestion } from "api/test/TestReadingQuestionApi";
import { getTest } from 'api/test/TestApi';
import { deleteTestReading, updateTestReading } from 'api/test/TestReadingApi';

export async function DeleteQuestionReadingTest(idTest, testDelete, serialQuestionUpdateOfQuestionMaxTest, minus) {
    const test = await getTest(idTest);

    const testReadings = test.testReadings;

    try {
        await Promise.all(testReadings.map(async (testReading) => {
            await Promise.all(testReading.questions.map(async (question) => {
                if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                    question.serial -= minus;
                    await updateTestReadingQuestion(question.id, question);
                }
            }));
        }));
        if (testDelete.test === true) {
            await deleteTestReading(testDelete.id);
            await Promise.all(testReadings.map(async (testReading) => {
                if (testReading.serial > testDelete.serial) {
                    testReading.serial -= 1;
                    await updateTestReading(testReading.id, testReading);
                }
            }));
            if (serialQuestionUpdateOfQuestionMaxTest === -1) {
                return;
            }
        } else {
            await deleteTestReadingQuestion(testDelete.id);
        }
    } catch (error) {
        console.error('Error processing the request:', error);
    }
}
