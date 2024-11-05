import apiClient from "api/apiClient";

export async function signInUser(data) {
  try {
    const res = await apiClient.post("/users/token", data);
    return res.data;
  } catch (err) {
    console.error("Error sign in:", err);
    throw err;
  }
}
