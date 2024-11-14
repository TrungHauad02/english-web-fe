import apiClient from "../apiClient";

export function getSubmitTestReadingAnswer(readingAnswerId) {
  return apiClient
    .get("/submit-test-reading-answers/" + readingAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving submit test reading answer:", error);
      throw error;
    });
}

export function createSubmitTestReadingAnswer(readingAnswer) {
  return apiClient
    .post("/submit-test-reading-answers", readingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating submit test reading answer:", error);
      throw error;
    });
}

export function updateSubmitTestReadingAnswer(id, readingAnswer) {
  return apiClient
    .put(`/submit-test-reading-answers/${id}`, readingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating submit test reading answer:", error);
      throw error;
    });
}

export function deleteSubmitTestReadingAnswer(readingAnswerId) {
  return apiClient
    .delete("/submit-test-reading-answers/" + readingAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test reading answer:", error);
      throw error;
    });
}
