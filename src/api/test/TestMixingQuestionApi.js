import apiClient from "../apiClient";

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

export function updateTestMixingQuestion(id, testmixingquestion) {
  console.log(id, testmixingquestion);

  return apiClient
    .put(`/testmixingquestion/${id}`, testmixingquestion)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating testmixingquestion question:", error);
      throw error;
    });
}

export function deleteTestMixingQuestion(testmixingquestionId) {
  return apiClient
    .delete("/testmixingquestion/" + testmixingquestionId)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting testmixingquestion question:", error);
      throw error;
    });
}
