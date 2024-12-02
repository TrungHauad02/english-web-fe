import apiClient from "api/apiClient";

export const getStudents = async (page = 0, size = 10, sortBy = "id", sortDir = "asc", filters = {}) => {
    const token = sessionStorage.getItem("authToken");

    try {
        const params = { page, size, sortBy, sortDir, ...filters };
        const response = await apiClient.get("/users/students", {
            params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching students:", error);
        throw error;
    }
};


