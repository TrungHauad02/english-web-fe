import { updateUser } from "api/user/updateUserService";

export const handleEditProfile = (setEditMode) => {
    setEditMode(true);
};

export const handleSave = async (name, userNote, image, setEditMode) => {
    try {
        const userData = {
            name: name || "",
            contentMotivation: userNote || "",
            avatar: image,
        };
        const updatedUser = await updateUser(userData);
        setEditMode(false);
    } catch (error) {
        console.error(error);
    }
};

export const handleImageChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl); 
    }
};

export const handleChangePasswordOpen = (setChangePasswordOpen) => {
    setChangePasswordOpen(true);
};

export const handleChangePasswordClose = (setChangePasswordOpen) => {
    setChangePasswordOpen(false);
};
