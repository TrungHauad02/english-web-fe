import apiClient from "../apiClient";

export function getTestSpeakingQuestion(testSpeakingQuestionId) {
  return apiClient
    .get("/testspeakingquestion/" + testSpeakingQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving speaking question:", error);
      throw error;
    });
}

export function createTestSpeakingQuestion(testSpeakingQuestion) {
  return apiClient
    .post("/testspeakingquestion", testSpeakingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating speaking question:", error);
      throw error;
    });
}

export function updateTestSpeakingQuestion(id, testSpeakingQuestion) {
  return apiClient
    .put(`/testspeakingquestion/${id}`, testSpeakingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating speaking question:", error);
      throw error;
    });
}

export function deleteTestSpeakingQuestion(testSpeakingQuestionId) {
  return apiClient
    .delete("/testspeakingquestion/" + testSpeakingQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting speaking question:", error);
      throw error;
    });
}
