import apiClient from "../apiClient";

export function getSubmitTest(submitTestId) {
  return apiClient
    .get("/submit-tests/" + submitTestId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving submit test:", error);
      throw error;
    });
}

export function createSubmitTest(submitTest) {
  return apiClient
    .post("/submit-tests", submitTest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating submit test:", error);
      throw error;
    });
}

export function updateSubmitTest(id, submitTest) {
  return apiClient
    .put(`/submit-tests/${id}`, submitTest)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating submit test:", error);
      throw error;
    });
}

export function deleteSubmitTest(submitTestId) {
  return apiClient
    .delete("/submit-tests/" + submitTestId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test:", error);
      throw error;
    });
}
