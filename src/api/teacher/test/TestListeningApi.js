import apiClient from "../../apiClient";

export function getListeningById(listeningId) {
  return apiClient
    .get("/api/testlistening/" + listeningId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving listening:", error);
      throw error;
    });
}

export function createListening(listening) {
  return apiClient
    .post("/api/testlistening", listening)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating listening:", error);
      throw error;
    });
}

export function updateListening(listening) {
  return apiClient
    .put("/api/testlistening", listening)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating listening:", error);
      throw error;
    });
}

export function deleteListeningById(listeningId) {
  return apiClient
    .delete("/api/testlistening/" + listeningId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting listening:", error);
      throw error;
    });
}
