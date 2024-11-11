import apiClient from "api/apiClient";
import { getIdToken } from "api/security/GetIdToken";

export const changePassword = async (oldPassword, newPassword) => {
    const token = localStorage.getItem("authToken");
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
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};
