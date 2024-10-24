import apiClient from "../../apiClient";

export function getTestById(Testid) {
  return apiClient
    .get("/api/tests/" + Testid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
}

export function createTest(testData) {
  return apiClient
    .post("/api/tests", testData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
}
export function updateTest(testData) {
  console.log(testData);

  return apiClient
    .put("/api/tests", testData)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating test:", error);
      throw error;
    });
}
export function deleteTestById(testId) {
  return apiClient
    .delete("/api/tests/" + testId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test:", error);
      throw error;
    });
}
