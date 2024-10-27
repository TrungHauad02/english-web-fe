import apiClient from "../apiClient";

export function getReadingQuestionById(readingQuestionId) {
  return apiClient
    .get("/testreadingquestion/" + readingQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving reading question:", error);
      throw error;
    });
}

export function createReadingQuestion(readingQuestion) {
  return apiClient
    .post("/testreadingquestion", readingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating reading question:", error);
      throw error;
    });
}

export function updateReadingQuestion(readingQuestion) {
  return apiClient
    .put("/testreadingquestion", readingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating reading question:", error);
      throw error;
    });
}

export function deleteReadingQuestionById(readingQuestionId) {
  return apiClient
    .delete("/api/testreadingquestion/" + readingQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading question:", error);
      throw error;
    });
}
