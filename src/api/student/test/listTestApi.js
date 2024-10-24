import apiClient from "../../apiClient";

export function getListTest(page, type) {
  return apiClient
    .get("/api/tests?page=" + page + "&type=" + type)
    .then((response) => {
      let data = response.data;
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      return data;
    });
}
export function getListTestByType(type) {
  return apiClient.get("/api/testsall?type=" + type).then((response) => {
    let data = response.data;
    if (typeof data === "string") {
      data = JSON.parse(data); // Parse JSON string thành object nếu cần
    }
    return data;
  });
}

export function getTestById(testId) {
  return apiClient.get("/api/tests/" + testId).then((response) => {
    return response.data;
  });
}
