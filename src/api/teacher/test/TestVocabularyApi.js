import apiClient from "../../apiClient";

export function getAnswerVocabularyById(answervocabularyid) {
  return apiClient
    .get("/testvocabularyanswer/" + answervocabularyid)
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
    .post("/testvocabularyanswer", answervocabulary)
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
    .put("/testvocabularyanswer", answervocabulary)

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
    .delete("/testvocabularyanswer/" + answervocabularyid)
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
    .get("/testvocabularyquestion/" + questionvocabularyid)
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
    .post("/testvocabularyquestion", questionvocabulary)
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
    .put("/testvocabularyquestion", questionvocabulary)
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
    .delete("/testvocabularyquestion/" + questionvocabularyid)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting test:", error);
      throw error;
    });
}
