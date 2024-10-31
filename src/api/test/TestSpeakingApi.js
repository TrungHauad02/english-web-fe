import apiClient from "../apiClient";

export function getTestSpeaking(testSpeakingId) {
  return apiClient
    .get("/testspeaking/" + testSpeakingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving speaking test:", error);
      throw error;
    });
}

export function createTestSpeaking(testSpeaking) {
  return apiClient
    .post("/testspeaking", testSpeaking)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating speaking test:", error);
      throw error;
    });
}

export function updateTestSpeaking(id, testSpeaking) {
  return apiClient
    .put(`/testspeaking/${id}`, testSpeaking)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating speaking test:", error);
      throw error;
    });
}

export function deleteTestSpeaking(testSpeakingId) {
  return apiClient
    .delete("/api/testspeaking/" + testSpeakingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting speaking test:", error);
      throw error;
    });
}
