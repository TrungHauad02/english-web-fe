import { deleteTestSpeakingQuestion, updateTestSpeakingQuestion } from "api/test/TestSpeakingQuestionApi";
import { getTest } from 'api/test/TestApi';
import { deleteTestSpeaking, updateTestSpeaking } from 'api/test/TestSpeakingApi';

export async function DeleteQuestionSpeakingTest(idtest, testDelete, serialQuestionUpdateOfQuestionMaxTest, minus) {
    const test = await getTest(idtest);

    const testSpeakings = test.testSpeakings;

    try {
        await Promise.all(testSpeakings.map(async (testSpeaking) => {
            await Promise.all(testSpeaking.questions.map(async (question) => {
                if (question.serial > serialQuestionUpdateOfQuestionMaxTest) {
                    question.serial -= minus;
                    await updateTestSpeakingQuestion(question.id, question);
                }
            }));
        }));
        if (testDelete.test === true) {
            await deleteTestSpeaking(testDelete.id);
            await Promise.all(testSpeakings.map(async (testSpeaking) => {
                if (testSpeaking.serial > testDelete.serial) {
                    testSpeaking.serial -= 1;
                    await updateTestSpeaking(testSpeaking.id, testSpeaking);
                }
            }));
            if (serialQuestionUpdateOfQuestionMaxTest === -1) {
                return;
            }
        } else {
            await deleteTestSpeakingQuestion(testDelete.id);
        }
    } catch (error) {
        console.error('Error processing the request:', error);
    }
}
