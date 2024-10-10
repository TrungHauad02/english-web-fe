import apiClient from "../apiClient";

export function getListTopic(page) {
  return apiClient.get("/topics?page=" + page).then((response) => {
    return response.data;
  });
}

export function getTopicById(topicId) {
  return apiClient.get("/topics/" + topicId).then((response) => {
    return response.data;
  });
}
