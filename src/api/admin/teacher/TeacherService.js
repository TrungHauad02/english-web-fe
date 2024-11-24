import apiClient from "api/apiClient";

export const getTeachers = async (
  page = 0,
  size = 5,
  sortBy = "id",
  sortDir = "asc",
  filters = {}
) => {
  const token = localStorage.getItem("authToken");

  try {
    const params = { page, size, sortBy, sortDir, ...filters };
    const response = await apiClient.get("/users/teachers", {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

export const createTeacher = async (teacherData) => {
  const token = localStorage.getItem("authToken");

  try {
    const response = await apiClient.post(
      "/users/teacher/signup",
      teacherData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating teacher:", error);
    throw error;
  }
};
