import apiClient from "../apiClient";

export function commentReadingQuestion(request) {
  return apiClient
    .post("/comment-reading-questions", request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error commenting on reading question:", error);
      throw error;
    });
}

export function commentListeningQuestion(request) {
  return apiClient
    .post("/comment-listening-questions", request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error commenting on listening question:", error);
      throw error;
    });
}

export function commentMixingQuestion(request) {
  return apiClient
    .post("/comment-mixing-questions", request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error commenting on mixing question:", error);
      throw error;
    });
}

export function scoreTestSpeakingQuestion(request) {
  return apiClient
    .post("/score-test-speaking-question", request)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error scoring speaking question:", error);
      throw error;
    });
}
