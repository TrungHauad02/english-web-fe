import { deleteTestListeningQuestion, updateTestListeningQuestion } from "api/test/TestListeningQuestionApi";
import { getTest } from 'api/test/TestApi';
import { deleteTestListening, updateTestListening } from 'api/test/TestListeningApi';

export async function DeleteQuestionListeningTest(idTest, testDelete, serialQuestionUpdateOfQuestionMaxTest, minus) {
    const test = await getTest(idTest);

    const testListenings = test.testListenings;

    try {
        await Promise.all(testListenings.map(async (testListening) => {
            await Promise.all(testListening.questions.map(async (question) => {
                if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                    question.serial -= minus;
                    await updateTestListeningQuestion(question.id, question);
                }
            }));
        }));
        if (testDelete.test === true) {
            await deleteTestListening(testDelete.id);
            await Promise.all(testListenings.map(async (testListening) => {
                if (testListening.serial > testDelete.serial) {
                    testListening.serial -= 1;
                    await updateTestListening(testListening.id, testListening);
                }
            }));
            if (serialQuestionUpdateOfQuestionMaxTest === -1) {
                return;
            }
        } else {
            await deleteTestListeningQuestion(testDelete.id);
        }
    } catch (error) {
        console.error('Error processing the request:', error);
    }
}
