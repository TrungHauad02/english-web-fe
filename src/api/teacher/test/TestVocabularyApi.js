import apiClient from "../../apiClient";

export function getAnswerVocabularyById(answervocabularyid) {
  return apiClient
    .get("/api/testvocabularyanswer/" + answervocabularyid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
}

export function createAnswerVocabulary(answervocabulary) {
  return apiClient
    .post("/api/testvocabularyanswer", answervocabulary)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
}
export function updateAnswerVocabulary(answervocabulary) {
  console.log("giatri", answervocabulary);
  return apiClient
    .put("/api/testvocabularyanswer", answervocabulary)

    .then((response) => {
      console.log("giatri", response.data);

      return response.data;
    })
    .catch((error) => {
      console.error("Error updating test:", error);
      throw error;
    });
}
export function deleteAnswerVocabularyById(answervocabularyid) {
  return apiClient
    .delete("/api/testvocabularyanswer/" + answervocabularyid)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test:", error);
      throw error;
    });
}

export function getQuestionVocabularyById(questionvocabularyid) {
  return apiClient
    .get("/api/testvocabularyquestion/" + questionvocabularyid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating test:", error);
      throw error;
    });
}

export function createQuestionVocabulary(questionvocabulary) {
  return apiClient
    .post("/api/testvocabularyquestion", questionvocabulary)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(questionvocabulary);

      console.error("Error creating test:", error);
      throw error;
    });
}
export function updateQuestionVocabulary(questionvocabulary) {
  return apiClient
    .put("/api/testvocabularyquestion", questionvocabulary)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating test:", error);
      throw error;
    });
}
export function deleteQuestionVocabularyById(questionvocabularyid) {
  return apiClient
    .delete("/api/testvocabularyquestion/" + questionvocabularyid)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test:", error);
      throw error;
    });
}
