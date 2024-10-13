import apiClient from "../../apiClient";

export function getTestListeningbySerial(testId) {
  return apiClient.get("/listening?testId=" + testId).then((response) => {
    return response.data;
  });
}

export function getTestById(testId) {
  return apiClient.get("/tests/" + testId).then((response) => {
    return response.data;
  });
}
