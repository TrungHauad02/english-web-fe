import apiClient from "api/apiClient";

export const getSpeechToText = async (audio) => {
  try {
    const response = await apiClient.post("/speech-to-text", {
      audioData: audio,
    });
    return response.data;
  } catch (error) {
    console.error("Error retrieving speech to text", error);
    throw error;
  }
};
