import apiClient from "../apiClient";

export async function getReadingDetail(id) {
  try {
    const res = await apiClient.get(`/readings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}
