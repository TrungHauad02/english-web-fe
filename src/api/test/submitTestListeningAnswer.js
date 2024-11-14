import apiClient from "../apiClient";

export function getSubmitTestListeningAnswer(listeningAnswerId) {
  return apiClient
    .get("/submit-test-listening-answers/" + listeningAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving submit test listening answer:", error);
      throw error;
    });
}

export function createSubmitTestListeningAnswer(listeningAnswer) {
  return apiClient
    .post("/submit-test-listening-answers", listeningAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating submit test listening answer:", error);
      throw error;
    });
}

export function updateSubmitTestListeningAnswer(id, listeningAnswer) {
  return apiClient
    .put(`/submit-test-listening-answers/${id}`, listeningAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating submit test listening answer:", error);
      throw error;
    });
}

export function deleteSubmitTestListeningAnswer(listeningAnswerId) {
  return apiClient
    .delete("/submit-test-listening-answers/" + listeningAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test listening answer:", error);
      throw error;
    });
}
