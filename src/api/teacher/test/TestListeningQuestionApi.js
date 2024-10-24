import apiClient from "../../apiClient";

// API cho TestListeningQuestion
export function getListeningQuestionById(listeningQuestionId) {
  return apiClient
    .get("/api/testlisteningquestion/" + listeningQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving listening question:", error);
      throw error;
    });
}

export function createListeningQuestion(listeningQuestion) {
  return apiClient
    .post("/api/testlisteningquestion", listeningQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating listening question:", error);
      throw error;
    });
}

export function updateListeningQuestion(listeningQuestion) {
  return apiClient
    .put("/api/testlisteningquestion", listeningQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating listening question:", error);
      throw error;
    });
}

export function deleteListeningQuestionById(listeningQuestionId) {
  return apiClient
    .delete("/api/listeningquestion/" + listeningQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening question:", error);
      throw error;
    });
}
