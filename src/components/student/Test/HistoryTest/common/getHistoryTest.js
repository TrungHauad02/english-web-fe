import { getTest } from "api/test/TestApi";
import { getSubmitTest } from "api/test/submitTest";
export const getHistoryTest = async (state, navigate) => {
  try {
    if (!state || !state.id) {
      navigate("/student/history-test");
      return;
    }
    const test = await getTest(state.testId, "ACTIVE");
    const submitTest = await getSubmitTest(state.id);
    return {
      test,
      submitTest,
    };
  } catch (error) {
    console.error("Error while fetching test data:", error);
  }
};
