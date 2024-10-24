import apiClient from "../../apiClient";

export function getReadingById(readingId) {
  return apiClient
    .get("/api/testreading/" + readingId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving reading test:", error);
      throw error;
    });
}

export function createReading(reading) {
  return apiClient
    .post("/api/testreading", reading)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating reading test:", error);
      throw error;
    });
}

export function updateReading(reading) {
  return apiClient
    .put("/api/testreading", reading)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating reading test:", error);
      throw error;
    });
}

export function deleteReadingById(readingId) {
  return apiClient
    .delete("/api/testreading/" + readingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading test:", error);
      throw error;
    });
}
