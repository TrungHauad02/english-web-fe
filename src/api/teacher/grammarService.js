import apiClient from "../apiClient";

export async function getGrammarDetail(id) {
  return {
    id: "Gram_1729739052518",
    title: "Simple Present Tense 1",
    serial: 6,
    content: "This is Simple Present Tense",
    description: "This is the description",
    image: "/environment.png",
    example: "This is a chair",
    file: "/file.pdf",
    status: "ACTIVE",
  };
  // try {
  //   const res = await apiClient.get(`/grammars/${id}`);
  //   return res.data;
  // } catch (err) {
  //   console.error("Error fetching detail:", err);
  //   throw err;
  // }
}
