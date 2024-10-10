import apiClient from "../apiClient";

export const getVocabularyInTopic = async (page, pageSize, topicId) => {
  const response = await apiClient.get(
    "/topics/vocabulary?page=" +
      page +
      "&pageSize=" +
      pageSize +
      "&topicId=" +
      topicId
  );

  return response.data;
};
