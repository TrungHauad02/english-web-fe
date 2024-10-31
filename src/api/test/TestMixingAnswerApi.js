import apiClient from "../apiClient";

export function createTestMixingAnswer(testmixinganswer) {
  return apiClient
    .post("/testmixinganswer", testmixinganswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test mixing answer:", error);
      throw error;
    });
}

export function updateTestMixingAnswer(id, testmixinganswer) {
  return apiClient
    .put(`/testmixinganswer/${id}`, testmixinganswer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating test mixing answer:", error);
      throw error;
    });
}

export function deleteTestMixingAnswer(testmixinganswerid) {
  return apiClient
    .delete("/testmixinganswer/" + testmixinganswerid)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test mixing answer:", error);
      throw error;
    });
}
