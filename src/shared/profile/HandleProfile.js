import { updateUser } from "api/user/userService";
import { handleFileUpload } from "shared/utils/uploadFileUtils";
import { fetchUserInfo } from "api/user/userService";
import { toast } from "react-toastify";

export const handleEditProfile = (setEditMode) => {
  setEditMode(true);
};

export const handleSave = async (name, userNote, image, setEditMode, setIsLoading) => {
  setIsLoading(true);
  try {
    let user = await fetchUserInfo();
    let id = user.id;

    const newImage = await handleFileUpload(
      user.avatar,
      image,
      id,
      "user/profile"
    );

    let updatedUser = { ...user, avatar: newImage };
    if (newImage !== user.avatar) {
      updatedUser = { ...user, avatar: newImage };
    }

    const userData = {
      name: name || "",
      contentMotivation: userNote || "",
      avatar: updatedUser.avatar,
    };

    await updateUser(userData, id);
    toast.success("Update infomation successfully!");
    setEditMode(false);
  } catch (error) {
    console.error("Error while saving:", error);
    toast.error("Update failure information");
  } finally{
    setIsLoading(false);
  }
};

export const handleChangePasswordOpen = (setChangePasswordOpen) => {
  setChangePasswordOpen(true);
};

export const handleChangePasswordClose = (setChangePasswordOpen) => {
  setChangePasswordOpen(false);
};
