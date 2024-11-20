import apiClient from "../../apiClient";

export const getListTopic = async (title, page, size, sortBy, name) => {
  try {
    const path = `/${title}?page=${page}&size=${size}&sortBy=${sortBy}&title=${name}`;
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};

export const getListTopicActive = async (title, page, size, sortBy) => {
  try {
    const path = `/${title}?page=${page}&size=${size}&sortBy=${sortBy}&status=ACTIVE`;
    const response = await apiClient.get(path);
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    throw error;
  }
};
