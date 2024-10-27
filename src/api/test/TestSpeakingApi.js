import apiClient from "../apiClient";

export function getSpeakingById(speakingId) {
  return apiClient
    .get("/testspeaking/" + speakingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving speaking test:", error);
      throw error;
    });
}

export function createSpeaking(speaking) {
  return apiClient
    .post("/testspeaking", speaking)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating speaking test:", error);
      throw error;
    });
}

export function updateSpeaking(speaking) {
  return apiClient
    .put("/testspeaking", speaking)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating speaking test:", error);
      throw error;
    });
}

export function deleteSpeakingById(speakingId) {
  return apiClient
    .delete("/api/testspeaking/" + speakingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting speaking test:", error);
      throw error;
    });
}
