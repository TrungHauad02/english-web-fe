export const convertTextToSpeech = async (text) => {
    const response = await fetch("https://api.example.com/convert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer YOUR_API_KEY"
      },
      body: JSON.stringify({ text }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to convert text to speech");
    }
  
    const data = await response.blob();
    return URL.createObjectURL(data);
  };