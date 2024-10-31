import apiClient from "../apiClient";

export function getTestReadingQuestion(testReadingQuestionId) {
  return apiClient
    .get("/testreadingquestion/" + testReadingQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving reading question:", error);
      throw error;
    });
}

export function createTestReadingQuestion(testReadingQuestion) {
  return apiClient
    .post("/testreadingquestion", testReadingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating reading question:", error);
      throw error;
    });
}

export function updateTestReadingQuestion(id, testReadingQuestion) {
  return apiClient
    .put(`/testreadingquestion/${id}`, testReadingQuestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating reading question:", error);
      throw error;
    });
}

export function deleteTestReadingQuestion(testReadingQuestionId) {
  return apiClient
    .delete("/api/testreadingquestion/" + testReadingQuestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading question:", error);
      throw error;
    });
}
