import apiClient from "../../apiClient";

export function getReadingById(readingId) {
  return apiClient
    .get("/testreading/" + readingId)
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
    .post("/testreading", reading)
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
    .put("/testreading", reading)
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
    .delete("/testreading/" + readingId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting reading test:", error);
      throw error;
    });
}
