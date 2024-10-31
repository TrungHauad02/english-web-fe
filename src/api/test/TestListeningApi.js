import apiClient from "../apiClient";

export function getTestListening(testlisteningId) {
  return apiClient
    .get("/testlistening/" + testlisteningId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving listening:", error);
      throw error;
    });
}

export function createTestListening(testlistening) {
  return apiClient
    .post("/testlistening", testlistening)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating listening:", error);
      throw error;
    });
}

export function updateTestListening(id, testlistening) {
  return apiClient
    .put(`/testlistening/${id}`, testlistening)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating listening:", error);
      throw error;
    });
}

export function deleteTestListening(testlisteningId) {
  return apiClient
    .delete("/testlistening/" + testlisteningId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening:", error);
      throw error;
    });
}
export function getTestListeningbySerial(testId) {
  return apiClient.get("/listening?testId=" + testId).then((response) => {
    return response.data;
  });
}
