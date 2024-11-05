import apiClient from "api/apiClient"; 

export async function signUpStudent(data) {
  try {
    const res = await apiClient.post(`/users/student/signup`, data);
    return res.data;
  } catch (err) {
    console.error("Error signing up student:", err);
    throw err;
  }
}
