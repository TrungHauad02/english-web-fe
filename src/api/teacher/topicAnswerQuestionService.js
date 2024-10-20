import apiClient from "../apiClient";

export const getTopicAnswerQuestions = async (topicId) => {
  const res = await apiClient.get(`/topics-question?topicId=${topicId}`);
  return res.data;
};
