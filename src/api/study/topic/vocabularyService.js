import apiClient from "../../apiClient";

export async function getVocabById(vocabId) {
  try {
    const res = await apiClient.get(`/vocabulary/${vocabId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching vocab:", err);
    throw err;
  }
}

export async function getVocabByTopicId(topicId) {
  try {
    const res = await apiClient.get(`/vocabulary/topics/${topicId}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching vocab:", err);
    throw err;
  }
}

export async function getVocabByPageAndTopicId(topicId, page, size, status) {
  try {
    const requestUrl = status
      ? `/vocabulary?page=${page}&size=${size}&topicId=${topicId}&status=${status}`
      : `/vocabulary?page=${page}&size=${size}&topicId=${topicId}`;

    const res = await apiClient.get(requestUrl);
    return res.data;
  } catch (err) {
    console.error("Error fetching vocab:", err);
    throw err;
  }
}

export async function searchVocabByPageAndTopicId(
  topicId,
  page,
  size,
  searchText
) {
  try {
    const requestUrl = `/vocabulary?page=${page}&size=${size}&topicId=${topicId}&searchText=${searchText}`;

    const res = await apiClient.get(requestUrl);
    return res.data;
  } catch (err) {
    console.error("Error fetching vocab:", err);
    throw err;
  }
}

export async function createVocab(vocab) {
  try {
    const res = await apiClient.post("/vocabulary", vocab);
    return res.data;
  } catch (err) {
    console.error("Error creating vocab:", err);
    throw err;
  }
}

export async function updateVocab(id, vocab) {
  try {
    const res = await apiClient.put(`/vocabulary/${id}`, vocab);
    return res.data;
  } catch (err) {
    console.error("Error updating vocab:", err);
    throw err;
  }
}

export async function deleteVocab(vocabId) {
  try {
    const res = await apiClient.delete(`/vocabulary/${vocabId}`);
    return res.data;
  } catch (err) {
    console.error("Error deleting vocab:", err);
    throw err;
  }
}
