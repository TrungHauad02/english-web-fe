import apiClient from "../apiClient";

export function getSpeakingQuestionById(speakingQuestionId) {
  return apiClient
    .get("/testspeakingquestion/" + speakingQuestionId)
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
    .post("/testspeakingquestion", speakingQuestion)
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
    .put("/testspeakingquestion", speakingQuestion)
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
    .delete("/testspeakingquestion/" + speakingQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting speaking question:", error);
      throw error;
    });
}
