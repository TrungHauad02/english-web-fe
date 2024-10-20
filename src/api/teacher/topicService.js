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

export async function updateTopic(data) {
  try {
    const res = await apiClient.put(`/topics`, data);
    return res.data;
  } catch (err) {
    console.error("Error updating topic:", err);
    throw err;
  }
}
