import apiClient from "../apiClient";

export function getTestListeningQuestionById(testListeningQuestionId) {
  return apiClient
    .get("/testlisteningquestion/" + testListeningQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving listening question:", error);
      throw error;
    });
}

export function createTestListeningQuestion(testListeningQuestion) {
  return apiClient
    .post("/testlisteningquestion", testListeningQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating listening question:", error);
      throw error;
    });
}

export function updateTestListeningQuestion(id, testListeningQuestion) {
  return apiClient
    .put(`/testlisteningquestion/${id}`, testListeningQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating listening question:", error);
      throw error;
    });
}

export function deleteTestListeningQuestion(tesListeningQuestionId) {
  return apiClient
    .delete("/testlisteningquestion/" + tesListeningQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening question:", error);
      throw error;
    });
}
