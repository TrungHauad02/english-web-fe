import apiClient from "../apiClient";

export async function getGrammarDetail(id) {
  try {
    const res = await apiClient.get(`/grammars/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}
