import apiClient from "../../apiClient";

export function getWritingById(writingId) {
  return apiClient
    .get("/api/testwriting/" + writingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving writing test:", error);
      throw error;
    });
}

export function createWriting(writing) {
  return apiClient
    .post("/api/testwriting", writing)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating writing test:", error);
      throw error;
    });
}

export function updateWriting(writing) {
  return apiClient
    .put("/api/testwriting", writing)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating writing test:", error);
      throw error;
    });
}

export function deleteWritingById(writingId) {
  return apiClient
    .delete("/api/testwriting/" + writingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting writing test:", error);
      throw error;
    });
}
