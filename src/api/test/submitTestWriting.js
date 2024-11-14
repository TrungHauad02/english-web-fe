import apiClient from "../apiClient";

export function getSubmitTestWriting(writingId) {
  return apiClient
    .get("/submit-test-writings/" + writingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving submit test writing:", error);
      throw error;
    });
}

export function createSubmitTestWriting(writing) {
  return apiClient
    .post("/submit-test-writings", writing)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating submit test writing:", error);
      throw error;
    });
}

export function updateSubmitTestWriting(id, writing) {
  return apiClient
    .put(`/submit-test-writings/${id}`, writing)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating submit test writing:", error);
      throw error;
    });
}

export function deleteSubmitTestWriting(writingId) {
  return apiClient
    .delete("/submit-test-writings/" + writingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test writing:", error);
      throw error;
    });
}
