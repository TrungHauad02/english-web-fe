import apiClient from "../apiClient";

export function getTest(Testid) {
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
  console.log(test);

  return apiClient
    .put(`/test/${id}`, test)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating test:", error);
      if (error.response) {
        console.error("Status Code:", error.response.status); // Mã lỗi từ server (ví dụ: 400, 404, 500)
        console.error("Response Data:", error.response.data); // Chi tiết lỗi từ server
        console.error("Headers:", error.response.headers); // Headers từ server
      }

      throw error; // Ném lỗi ra để xử lý tiếp (nếu cần)
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
