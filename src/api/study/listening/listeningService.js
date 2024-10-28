import apiClient from "../../apiClient";

export async function getListeningDetail(id) {
  try {
    const res = await apiClient.get(`/listenings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}
