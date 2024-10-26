import apiClient from "../apiClient";

export async function getTopicDetail(id) {
  try {
    const res = await apiClient.get(`/topics/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function updateTopic(id, data) {
  try {
    const res = await apiClient.put(`/topics/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating topic:", err);
    throw err;
  }
}

export async function createTopic(data) {
  try {
    const res = await apiClient.post(`/topics`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating topic:", err);
    throw err;
  }
}

export async function deleteTopic(id) {
  try {
    await apiClient.delete(`/topics/${id}`);
  } catch (error) {
    throw error;
  }
}
