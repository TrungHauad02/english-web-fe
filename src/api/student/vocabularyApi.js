import apiClient from "../apiClient";

export const getVocabularyInTopic = async (page, size, topicId) => {
  try {
    const res = await apiClient.get(
      `/vocabulary?page=${page}&size=${size}&topicId=${topicId}`
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching vocab:", err);
    throw err;
  }
};
