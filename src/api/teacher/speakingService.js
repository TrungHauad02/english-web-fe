import apiClient from "../apiClient";

export async function getSpeakingDetail(id) {
  return {};
  // try {
  //   const res = await apiClient.get(`/speakings/${id}`);
  //   return res.data;
  // } catch (err) {
  //   console.error("Error fetching detail:", err);
  //   throw err;
  // }
}

export function getConversationDetail(id) {
  const data = {
    1: [
      {
        id: "1",
        serial: 1,
        name: "John",
        content: "Hello",
      },
      {
        id: "2",
        serial: 2,
        name: "Dutch",
        content: "Hi",
      },
      {
        id: "3",
        serial: 3,
        name: "Mica",
        content: "How are you?",
      },
      {
        id: "4",
        serial: 4,
        name: "Jenny",
        content: "I'm fine",
      },
      {
        id: "5",
        serial: 5,
        name: "Linda",
        content: "Goodbye",
      },
    ],
  };
  return data[id];
}
