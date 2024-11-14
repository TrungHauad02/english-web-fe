import apiClient from "../apiClient";

export function getSubmitTestMixingAnswer(mixingAnswerId) {
  return apiClient
    .get("/submit-test-mixing-answers/" + mixingAnswerId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving submit test mixing answer:", error);
      throw error;
    });
}

export function createSubmitTestMixingAnswer(mixingAnswer) {
  return apiClient
    .post("/submit-test-mixing-answers", mixingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating submit test mixing answer:", error);
      throw error;
    });
}

export function updateSubmitTestMixingAnswer(id, mixingAnswer) {
  return apiClient
    .put(`/submit-test-mixing-answers/${id}`, mixingAnswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating submit test mixing answer:", error);
      throw error;
    });
}

export function deleteSubmitTestMixingAnswer(mixingAnswerId) {
  return apiClient
    .delete("/submit-test-mixing-answers/" + mixingAnswerId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test mixing answer:", error);
      throw error;
    });
}
