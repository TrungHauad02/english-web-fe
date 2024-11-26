import apiClient from "api/apiClient";

export const scoreConversation = async (speechText, realText) => {
  try {
    const res = await apiClient.post("/score-speech-text", {
      speechText: speechText,
      realText: realText,
    });
    return res.data;
  } catch (err) {
    throw err;
  }
};
