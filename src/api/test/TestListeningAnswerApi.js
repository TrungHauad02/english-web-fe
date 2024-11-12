import apiClient from "../apiClient";

export function getTestListeningAnswer(listeningAnswerId) {
  return apiClient
    .get("/testlisteninganswer/" + listeningAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving listening answer:", error);
      throw error;
    });
}

export function createTestListeningAnswer(listeningAnswer) {
  return apiClient
    .post("/testlisteninganswer", listeningAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating listening answer:", error);
      throw error;
    });
}

export function updateTestListeningAnswer(id, listeningAnswer) {
  return apiClient
    .put(`/testlisteninganswer/${id}`, listeningAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating listening answer:", error);
      throw error;
    });
}

export function deleteTestListeningAnswer(listeningAnswerId) {
  return apiClient
    .delete("/testlisteninganswer/" + listeningAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening answer:", error);
      throw error;
    });
}
