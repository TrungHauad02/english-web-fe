import apiClient from "../../apiClient";

export function getListeningAnswerById(listeningAnswerId) {
  return apiClient
    .get("/api/testlisteninganswer/" + listeningAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving listening answer:", error);
      throw error;
    });
}

export function createListeningAnswer(listeningAnswer) {
  return apiClient
    .post("/api/testlisteninganswer", listeningAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating listening answer:", error);
      throw error;
    });
}

export function updateListeningAnswer(listeningAnswer) {
  return apiClient
    .put("/api/testlisteninganswer", listeningAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating listening answer:", error);
      throw error;
    });
}

export function deleteListeningAnswerById(listeningAnswerId) {
  return apiClient
    .delete("/api/testlisteninganswer/" + listeningAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening answer:", error);
      throw error;
    });
}
