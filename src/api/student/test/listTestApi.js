import apiClient from "../../apiClient";

export function getListTest(page, type) {
  return apiClient
    .get("/tests?page=" + page + "&type=" + type)
    .then((response) => {
      return response.data;
    });
}

export function getTestById(testId) {
  return apiClient.get("/tests/" + testId).then((response) => {
    return response.data;
  });
}
