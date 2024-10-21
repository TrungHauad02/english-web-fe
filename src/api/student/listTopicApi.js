import apiClient from "../apiClient";

export async function getListTopic(page, size) {
  try {
    const response = await apiClient.get(`/topics?page=${page}&size=${size}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getTopicById(topicId) {
  try {
    const response = await apiClient.get(`/topics/${topicId}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
}
