import apiClient from "../../apiClient";

export async function getReadingDetail(id) {
  try {
    const res = await apiClient.get(`/readings/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function createReading(reading) {
  try {
    const res = await apiClient.post(`/readings`, reading);
    return res.data;
  } catch (err) {
    console.error("Error create reading: ", err);
    throw err;
  }
}

export async function updateReading(id, reading) {
  try {
    const res = await apiClient.put(`/readings/${id}`, reading);
    return res.data;
  } catch (err) {
    console.error("Error update reading: ", err);
    throw err;
  }
}

export async function deleteReading(id) {
  try {
    await apiClient.delete(`/readings/${id}`);
  } catch (err) {
    console.error("Error delete reading: ", err);
    throw err;
  }
}
