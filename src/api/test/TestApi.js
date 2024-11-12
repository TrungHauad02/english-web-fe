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

export const deleteQuestionTest = async (
  testid,
  type,
  testdeleteid,
  serial
) => {
  try {
    const response = await apiClient.post("/test/question/delete", {
      testid: testid,
      type: type,
      testdeleteid: testdeleteid,
      serial: serial,
    });

    if (response.status === 204) {
      console.log("Question deleted successfully");
    } else {
      console.error("Failed to delete question");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
export const addQuestionTest = async (testid, type, testadd) => {
  try {
    const response = await apiClient.post("/test/question/add", {
      testid: testid,
      type: type,
      testadd: testadd,
    });

    if (response.status === 200) {
      console.log("Question added successfully");
      return response.data;
    } else {
      console.error("Failed to add question");
      return null;
    }
  } catch (error) {
    console.error("Error adding question:", error);
    return null;
  }
};
