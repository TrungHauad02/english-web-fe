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

export async function createListening(listening) {
  try {
    const res = await apiClient.post(`/listenings`, listening);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function updateListening(id, listening) {
  try {
    const res = await apiClient.put(`/listenings/${id}`, listening);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function deleteListening(id) {
  try {
    await apiClient.delete(`/listenings/${id}`);
  } catch (error) {
    throw error;
  }
}
