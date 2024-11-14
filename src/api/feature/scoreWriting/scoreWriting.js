import apiClient from "api/apiClient";

export const scoreWriting = async (text, topic) => {
  try {
    const data = {
      text: text,
      topic: topic,
    };
    const res = await apiClient.post("/score-writings", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
