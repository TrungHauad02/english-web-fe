import apiClient from "api/apiClient";

export function getConversationInSpeaking(speakingId) {
  try {
    const res = apiClient.get(`/speakingConversation?speakingId=${speakingId}`);
    return res.data;
  } catch (error) {
    console.error("Error fetch data conversation: ", error);
    throw error;
  }
}

export function createConversation(object) {
  try {
    const res = apiClient.post(`/speakingConversation`, object);
    return res.data;
  } catch (error) {
    console.error("Error create data conversation: ", error);
    throw error;
  }
}

export function updateConversation(id, object) {
  try {
    const res = apiClient.put(`/speakingConversation/${id}`, object);
    return res.data;
  } catch (error) {
    console.error("Error update data conversation: ", error);
    throw error;
  }
}

export function deleteConversation(id) {
  try {
    const res = apiClient.delete(`/speakingConversation/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error delete data conversation: ", error);
    throw error;
  }
}
