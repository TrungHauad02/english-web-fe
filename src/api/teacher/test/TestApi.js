import apiClient from "../../apiClient";

export function getTestById(Testid) {
  return apiClient
    .get("/tests/" + Testid)
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
    .post("/tests", testData)
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
    .put("/tests", testData)
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
    .delete("/tests/" + testId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test:", error);
      throw error;
    });
}
