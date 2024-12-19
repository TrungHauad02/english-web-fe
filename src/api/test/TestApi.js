import apiClient from "../apiClient";

export function getTest(Testid, status = null) {
  return apiClient
    .get(`/test/${Testid}`, {
      params: { status },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(
        "Error fetching test:",
        error.response?.data || error.message
      );
      throw error;
    });
}

export function createTest(test) {
  return apiClient
    .post("/test", test)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
}
export function updateTest(id, test) {
  return apiClient
    .put(`/test/${id}`, test)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
export function deleteTest(testId) {
  return apiClient
    .delete("/test/" + testId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test:", error);
      throw error;
    });
}
export function getMaxSerial() {
  return apiClient
    .get("/test/max-serial")
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching max serial:", error);
      throw error;
    });
}
export function updateStatus(id) {
  return apiClient
    .patch(`/test/update-status/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error updating status:", error);
      throw error;
    });
}
export function deleteSubmitTests(id) {
  return apiClient
    .delete(`/test/delete-submit-tests/${id}`)
    .then((response) => {
      console.log("Submit test deleted successfully");
      return response.data;
    })
    .catch((error) => {
      console.error(
        "Error deleting submit test:",
        error.response?.data || error.message
      );
      throw error;
    });
}
