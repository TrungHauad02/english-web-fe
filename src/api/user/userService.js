import apiClient from "api/apiClient";
import { getIdToken } from "api/security/getIdToken";

export const changePassword = async (oldPassword, newPassword) => {
    const id = getIdToken();

    if (!id) {
        throw new Error("Không thể lấy ID người dùng từ token.");
    }

    const response = await apiClient.patch(
        `/users/change-password/${id}`,
        {
            oldPassword: oldPassword,
            newPassword: newPassword,
        },
    );

    return response.data;
};

export const fetchUserInfo = async () => {
    const response = await apiClient.get("users/myinfo");
    return response.data;
};

export const updateUser = async (userData, id) => {
    try {
        const response = await apiClient.patch(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user in API:", error);
        throw error;
    }
};

export const getUserById = async (id) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
}

