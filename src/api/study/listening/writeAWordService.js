import apiClient from "api/apiClient";

export async function getWriteAWordById(id) {
  try {
    const res = await apiClient.get(`/listenAndWriteAWord/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error when get question write a word by id: ", error);
    throw error;
  }
}

export async function getWriteAWordByListeningId(listeningId, status) {
  try {
    const queryParams = `listeningId=${listeningId}${
      status ? `&status=${status}` : ""
    }`;
    const res = await apiClient.get(`/listenAndWriteAWord?${queryParams}`);
    return res.data;
  } catch (error) {
    console.error("Error when get list question write a word: ", error);
    throw error;
  }
}

export async function createWriteAWord(object) {
  try {
    const res = await apiClient.post(`/listenAndWriteAWord`, object);
    return res.data;
  } catch (error) {
    console.error("Error when create write a word: ", error);
    throw error;
  }
}

export async function updateWriteAWord(id, object) {
  try {
    const res = await apiClient.put(`/listenAndWriteAWord/${id}`, object);
    return res.data;
  } catch (error) {
    console.error("Error when update write a word: ", error);
    throw error;
  }
}

export async function deleteWriteAWord(id) {
  try {
    const res = await apiClient.delete(`/listenAndWriteAWord/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error when delete write a word: ", error);
    throw error;
  }
}
