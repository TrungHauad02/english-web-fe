import apiClient from "api/apiClient";

export const fetchUserInfo = async () => {
  const token = localStorage.getItem("authToken");
  const response = await apiClient.get("users/myinfo", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
