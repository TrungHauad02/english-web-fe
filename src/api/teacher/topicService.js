import apiClient from "../apiClient";

export async function getTopicDetail(id) {
  try {
    const res = await apiClient.get(`/topics/${id}`);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}
