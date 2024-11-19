import apiClient from "api/apiClient";

export const scoreConversation = async (
  speakingConversationId,
  scale,
  audioProvided
) => {
  try {
    const data = {
      speakingConversationId,
      scale,
      audioProvided,
    };
    const res = await apiClient.post("/score-speakings/score", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
