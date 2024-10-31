import apiClient from "../apiClient";

export function getTestReadingAnswer(testReadingAnswerId) {
  return apiClient
    .get("/testreadinganswer/" + testReadingAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving reading answer:", error);
      throw error;
    });
}

export function createTestReadingAnswer(testReadingAnswer) {
  return apiClient
    .post("/testreadinganswer", testReadingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating reading answer:", error);
      throw error;
    });
}

export function updateTestReadingAnswer(id, testReadingAnswer) {
  return apiClient
    .put(`/testreadinganswer/${id}`, testReadingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating reading answer:", error);
      throw error;
    });
}

export function deleteTestReadingAnswer(testReadingAnswerId) {
  return apiClient
    .delete("/testreadinganswer/" + testReadingAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading answer:", error);
      throw error;
    });
}
