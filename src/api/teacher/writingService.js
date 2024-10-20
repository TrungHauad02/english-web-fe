import apiClient from "../apiClient";

export async function getWritingDetail(id) {
  try {
    const res = await apiClient.get(`/writings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}
