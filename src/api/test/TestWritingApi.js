import apiClient from "../apiClient";

export function getTestWriting(testWritingId) {
  return apiClient
    .get("/testwriting/" + testWritingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving writing test:", error);
      throw error;
    });
}

export function createTestWriting(testWriting) {
  return apiClient
    .post("/testwriting", testWriting)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating writing test:", error);
      throw error;
    });
}

export function updateTestWriting(id, testWriting) {
  return apiClient
    .put(`/testwriting/${id}`, testWriting)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating writing test:", error);
      throw error;
    });
}

export function deleteTestWriting(testWritingId) {
  return apiClient
    .delete("/testwriting/" + testWritingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting writing test:", error);
      throw error;
    });
}
