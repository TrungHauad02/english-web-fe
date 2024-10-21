import apiClient from "../apiClient";

export async function getListTopic(page, size) {
  try {
    const response = await apiClient.get(`/topics?page=${page}&size=${size}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTopicById(topicId) {
  try {
    const response = await apiClient.get(`/topics/${topicId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
