import apiClient from "../apiClient";

export const getTopicAnswerQuestions = async (topicId) => {
  try {
    const res = await apiClient.get(`/topics-question?topicId=${topicId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createTopicQuestion = async (question) => {
  try {
    const res = await apiClient.post(`/topics-question`, question);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateTopicQuestion = async (question) => {
  try {
    const res = await apiClient.put(`/topics-question`, question);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTopicQuestion = async (id) => {
  try {
    await apiClient.delete(`/topics-question/${id}`);
  } catch (error) {
    throw error;
  }
};

export const createTopicAnswer = async (answer) => {
  try {
    const res = await apiClient.post(`/topics-answer`, answer);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const updateTopicAnswer = async (answer) => {
  try {
    const res = await apiClient.put(`/topics-answer`, answer);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTopicAnswer = async (id) => {
  try {
    apiClient.delete(`/topics-answer/${id}`);
  } catch (error) {
    throw error;
  }
};
