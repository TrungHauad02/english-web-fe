import apiClient from "../apiClient";

export function getTestReading(testReadingId) {
  return apiClient
    .get("/testreading/" + testReadingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving reading test:", error);
      throw error;
    });
}

export function createTestReading(testReading) {
  return apiClient
    .post("/testreading", testReading)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating reading test:", error);
      throw error;
    });
}

export function updateTestReading(id, testReading) {
  return apiClient
    .put(`/testreading/${id}`, testReading)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating reading test:", error);
      throw error;
    });
}

export function deleteTestReading(testReadingId) {
  return apiClient
    .delete("/testreading/" + testReadingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading test:", error);
      throw error;
    });
}
