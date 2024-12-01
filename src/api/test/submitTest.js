import apiClient from "../apiClient";

export function getListSubmitTests(
  page = 1,
  userId,
  type = "",
  searchTerm = "",
  startDate = "",
  endDate = ""
) {
  const params = new URLSearchParams({
    page: page - 1,
    size: 10,
    userId,
    title: searchTerm,
    type,
    startDate,
    endDate,
  });
  return apiClient
    .get(`/submit-test?${params.toString()}`)
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

export function getSubmitTest(submitTestId) {
  return apiClient
    .get("/submit-test/" + submitTestId)
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
    .post("/submit-test", submitTest)
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
    .put(`/submit-test/${id}`, submitTest)
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
    .delete("/submit-test/" + submitTestId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting submit test:", error);
      throw error;
    });
}
