import apiClient from "../../apiClient";

export async function getWritingDetail(id) {
  try {
    const res = await apiClient.get(`/writings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function createWriting(writing) {
  try {
    const res = await apiClient.post(`/writings`, writing);
    return res.data;
  } catch (err) {
    console.error("Error create writing:", err);
    throw err;
  }
}

export async function updateWriting(id, writing) {
  try {
    const res = await apiClient.put(`/writings/${id}`, writing);
    return res.data;
  } catch (err) {
    console.error("Error create writing:", err);
    throw err;
  }
}

export async function deleteWriting(id) {
  try {
    const res = await apiClient.delete(`/writings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error create writing:", err);
    throw err;
  }
}
