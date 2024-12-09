import apiClient from "api/apiClient";

export const getSpeechToText = async (audio, channel_counts = 1) => {
  try {
    const response = await apiClient.post(
      `/speech-to-text?channel_counts=${channel_counts}`,
      {
        audioData: audio,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving speech to text", error);
    throw error;
  }
};
