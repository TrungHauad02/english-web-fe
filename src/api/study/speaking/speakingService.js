import apiClient from "../../apiClient";

export async function getSpeakingDetail(id) {
  try {
    const res = await apiClient.get(`/speakings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function createSpeaking(speaking) {
  try {
    const res = await apiClient.post(`/speakings`, speaking);
    return res.data;
  } catch (err) {
    console.error("Error create speaking:", err);
    throw err;
  }
}

export async function updateSpeaking(id, speaking) {
  try {
    const res = await apiClient.put(`/speakings/${id}`, speaking);
    return res.data;
  } catch (err) {
    console.error("Error update speaking", err);
    throw err;
  }
}

export async function deleteSpeaking(id) {
  try {
    const res = await apiClient.delete(`/speakings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error delete speaking:", err);
    throw err;
  }
}
