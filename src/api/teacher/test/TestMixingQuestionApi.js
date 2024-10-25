import apiClient from "../../apiClient";

export function getTestMixingQuestion(mixingQuestionId) {
  return apiClient
    .get("/testmixingquestion/" + mixingQuestionId)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving testmixingquestion question:", error);
      throw error;
    });
}

export function createTestMixingQuestion(testmixingquestion) {
  return apiClient
    .post("/testmixingquestion", testmixingquestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating testmixingquestion question:", error);
      throw error;
    });
}

export function updateTestMixingQuestion(testmixingquestion) {
  return apiClient
    .put("/testmixingquestion", testmixingquestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating testmixingquestion question:", error);
      throw error;
    });
}

export function deleteTestMixingQuestionById(testmixingquestionId) {
  return apiClient
    .delete("/api/testmixingquestion/" + testmixingquestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting testmixingquestion question:", error);
      throw error;
    });
}
