import apiClient from "api/apiClient";

export const textToSpeech = async (text, voice) => {
  try {
    const response = await apiClient.get(
      `/text-to-speech/convert?voice=${voice}&text=${text}`,
      { responseType: "blob" }
    );
    const audioUrl = URL.createObjectURL(response.data);
    return audioUrl;
  } catch (error) {
    console.error("Error converting text to speech", error);
    throw error;
  }
};
