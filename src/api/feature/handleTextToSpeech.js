export const handleTextToSpeech = async (text) => {
  const response = await fetch("/api/text-to-speech", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to convert text to speech");
  }

  const data = await response.json();
  return data.audioUrl;
};
