import apiClient from "api/apiClient";

export async function getConversationInSpeaking(speakingId) {
  try {
    const res = await apiClient.get(
      `/speakingConversation?speakingId=${speakingId}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetch data conversation: ", error);
    throw error;
  }
}

export async function createConversation(object) {
  try {
    const res = await apiClient.post(`/speakingConversation`, object);
    return res.data;
  } catch (error) {
    console.error("Error create data conversation: ", error);
    throw error;
  }
}

export async function updateConversation(id, object) {
  try {
    const res = await apiClient.put(`/speakingConversation/${id}`, object);
    return res.data;
  } catch (error) {
    console.error("Error update data conversation: ", error);
    throw error;
  }
}

export async function deleteConversation(id) {
  try {
    const res = await apiClient.delete(`/speakingConversation/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error delete data conversation: ", error);
    throw error;
  }
}
