import apiClient from "../../apiClient";

export async function getGrammarDetail(id) {
  try {
    const res = await apiClient.get(`/grammars/${id}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching detail:", err);
    throw err;
  }
}

export async function createGrammar(grammar) {
  try {
    const res = await apiClient.post(`/grammars`, grammar);
    return res.data;
  } catch (err) {
    console.error("Error create grammar: ", err);
    throw err;
  }
}

export async function updateGrammar(id, grammar) {
  try {
    const res = await apiClient.put(`/grammars/${id}`, grammar);
    return res.data;
  } catch (err) {
    console.error("Error update grammar: ", err);
    throw err;
  }
}

export async function deleteGrammar(id) {
  try {
    await apiClient.delete(`/grammars/${id}`);
  } catch (err) {
    throw err;
  }
}
