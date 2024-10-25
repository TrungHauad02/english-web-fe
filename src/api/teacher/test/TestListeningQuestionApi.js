import apiClient from "../../apiClient";

export function getListeningQuestionById(listeningQuestionId) {
  return apiClient
    .get("/testlisteningquestion/" + listeningQuestionId)
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
    .post("/testlisteningquestion", listeningQuestion)
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
    .put("/testlisteningquestion", listeningQuestion)
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
    .delete("/listeningquestion/" + listeningQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening question:", error);
      throw error;
    });
}
