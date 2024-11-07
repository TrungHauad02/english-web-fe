import apiClient from "api/apiClient";
import { getIdToken } from "api/security/getIdToken";

export const updateUser = async (userData) => {
  const token = localStorage.getItem("authToken");
  const id = getIdToken();

  if (!id) {
    throw new Error("Không thể lấy ID người dùng từ token.");
  }

  const response = await apiClient.patch(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
