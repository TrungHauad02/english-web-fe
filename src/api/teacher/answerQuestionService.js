import apiClient from "../apiClient";

export const getAnswerQuestions = async (path, id) => {
  try {
    let nameId = "";
    if (path === "topics") nameId = "topicId";
    if (path === "grammar") nameId = "grammarId";
    if (path === "reading") nameId = "readingId";
    const res = await apiClient.get(`/${path}-question?${nameId}=${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createQuestion = async (path, question) => {
  try {
    const res = await apiClient.post(`/${path}-question`, question);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateQuestion = async (path, id, question) => {
  try {
    const res = await apiClient.put(`${path}-question/${id}`, question);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteQuestion = async (path, id) => {
  try {
    await apiClient.delete(`${path}-question/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createAnswer = async (path, answer) => {
  try {
    const res = await apiClient.post(`/${path}-answer`, answer);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateAnswer = async (path, id, answer) => {
  try {
    const res = await apiClient.put(`/${path}-answer/${id}`, answer);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnswer = async (path, id) => {
  try {
    apiClient.delete(`/${path}-answer/${id}`);
  } catch (error) {
    throw error;
  }
};
