import apiClient from "../../apiClient";

export function getSpeakingQuestionById(speakingQuestionId) {
  return apiClient
    .get("/api/testspeakingquestion/" + speakingQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving speaking question:", error);
      throw error;
    });
}

export function createSpeakingQuestion(speakingQuestion) {
  return apiClient
    .post("/api/testspeakingquestion", speakingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating speaking question:", error);
      throw error;
    });
}

export function updateSpeakingQuestion(speakingQuestion) {
  return apiClient
    .put("/api/testspeakingquestion", speakingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating speaking question:", error);
      throw error;
    });
}

export function deleteSpeakingQuestionById(speakingQuestionId) {
  return apiClient
    .delete("/api/testspeakingquestion/" + speakingQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting speaking question:", error);
      throw error;
    });
}
