import apiClient from "../apiClient";

export function getListTest(page = 1, type = "", searchTerm = "", status = "") {
  const params = new URLSearchParams({
    page: page - 1, // Backend sử dụng page bắt đầu từ 0
    type,
    title: searchTerm,
    status,
  });
  console.log(params.toString());

  return apiClient
    .get(`/test?${params.toString()}`)
    .then((response) => {
      let data = response.data;
      try {
        if (typeof data === "string" && data.trim().startsWith("{")) {
          data = JSON.parse(data);
        }
        return data;
      } catch (error) {
        console.error("Error parsing JSON:", error);
        throw new Error("Invalid JSON response from API");
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}
export function getListTestByType(type) {
  return apiClient.get("/testsall?type=" + type).then((response) => {
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
