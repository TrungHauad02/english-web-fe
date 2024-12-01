import apiClient from "api/apiClient";

export const scoreTestWriting = async (text, topic, maxScore) => {
  try {
    const data = {
      text: text,
      topic: topic,
      maxScore: maxScore,
    };
    const res = await apiClient.post("/score-test-writings", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
