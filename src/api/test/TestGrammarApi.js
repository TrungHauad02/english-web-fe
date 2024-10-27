import apiClient from "../apiClient";

export function getAnswerGrammarById(answergrammarid) {
  return apiClient
    .get("/testgrammaranswer/" + answergrammarid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving grammar answer:", error);
      throw error;
    });
}

export function createAnswerGrammar(answergrammar) {
  return apiClient
    .post("/testgrammaranswer", answergrammar)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating grammar answer:", error);
      throw error;
    });
}

export function updateAnswerGrammar(answergrammar) {
  return apiClient
    .put("/testgrammaranswer", answergrammar)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating grammar answer:", error);
      throw error;
    });
}

export function deleteAnswerGrammarById(answergrammarid) {
  return apiClient
    .delete("/testgrammaranswer/" + answergrammarid)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting grammar answer:", error);
      throw error;
    });
}

export function getQuestionGrammarById(questiongrammarid) {
  return apiClient
    .get("/testgrammarquestion/" + questiongrammarid)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error retrieving grammar question:", error);
      throw error;
    });
}

export function createQuestionGrammar(questiongrammar) {
  return apiClient
    .post("/testgrammarquestion", questiongrammar)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating grammar question:", error);
      throw error;
    });
}

export function updateQuestionGrammar(questiongrammar) {
  return apiClient
    .put("/testgrammarquestion", questiongrammar)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error updating grammar question:", error);
      throw error;
    });
}

export function deleteQuestionGrammarById(questiongrammarid) {
  return apiClient
    .delete("/testgrammarquestion/" + questiongrammarid)
    .then((response) => {
      return response.status === 204;
    })
    .catch((error) => {
      console.error("Error deleting grammar question:", error);
      throw error;
    });
}
