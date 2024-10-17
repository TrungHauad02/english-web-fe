import apiClient from "../apiClient";

export const getListTopic = async (title, page, size, sortBy) => {
  try {
    const path = `/${title}?page=${page}&size=${size}&sortBy=${sortBy}`;
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    throw error;
  }
};
