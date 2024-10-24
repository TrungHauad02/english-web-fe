import apiClient from "../../apiClient";

export function getReadingAnswerById(readingAnswerId) {
  return apiClient
    .get("/api/testreadinganswer/" + readingAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving reading answer:", error);
      throw error;
    });
}

export function createReadingAnswer(readingAnswer) {
  return apiClient
    .post("/api/testreadinganswer", readingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating reading answer:", error);
      throw error;
    });
}

export function updateReadingAnswer(readingAnswer) {
  return apiClient
    .put("/api/testreadinganswer", readingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating reading answer:", error);
      throw error;
    });
}

export function deleteReadingAnswerById(readingAnswerId) {
  return apiClient
    .delete("/api/testreadinganswer/" + readingAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading answer:", error);
      throw error;
    });
}
