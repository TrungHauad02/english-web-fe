import apiClient from "../apiClient";

export function getSubmitTestSpeaking(speakingId) {
  return apiClient
    .get("/submit-test-speakings/" + speakingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving submit test speaking:", error);
      throw error;
    });
}

export function createSubmitTestSpeaking(speaking) {
  return apiClient
    .post("/submit-test-speakings", speaking)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating submit test speaking:", error);
      throw error;
    });
}

export function updateSubmitTestSpeaking(id, speaking) {
  return apiClient
    .put(`/submit-test-speakings/${id}`, speaking)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating submit test speaking:", error);
      throw error;
    });
}

export function deleteSubmitTestSpeaking(speakingId) {
  return apiClient
    .delete("/submit-test-speakings/" + speakingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test speaking:", error);
      throw error;
    });
}
