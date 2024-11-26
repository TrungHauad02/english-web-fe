import { useState, useRef, useCallback } from "react";
import { getTeachers } from "api/admin/teacher/TeacherService";
import { updateUser } from "api/user/userService";
import { handleFileUpload } from "shared/utils/uploadFileUtils";
import { createTeacher } from "api/admin/teacher/TeacherService";
import { fetchUserInfo } from "api/user/userService";
import { toast } from "react-toastify";

export const useTeacherData = (
  searchName,
  searchLevel,
  searchStartDate,
  searchEndDate,
  size
) => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const loadTeachers = async (currentPage = 0) => {
    try {
      const filters = {
        name: searchName,
        startDate: searchStartDate
          ? new Date(searchStartDate).toISOString().split("T")[0]
          : undefined,
        endDate: searchEndDate
          ? new Date(searchEndDate).toISOString().split("T")[0]
          : undefined,
        level: searchLevel === "ALL" ? undefined : searchLevel,
      };

      const data = await getTeachers(currentPage, size, "id", "asc", filters);

      const validData = data.content.map((teacher) => ({
        ...teacher,
        name: teacher.name || "",
        email: teacher.email || "",
        level: teacher.level || "",
        avatar: teacher.avatar || "/header_user.png",
        startDate: teacher.startDate || "",
        endDate: teacher.endDate || "",
        status: teacher.status || "Active",
      }));

      setTeachers(validData);
      setFilteredTeachers(validData);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error("Unable to load teacher list. Please try again later.");
    }
  };

  return {
    teachers,
    filteredTeachers,
    setFilteredTeachers,
    loadTeachers,
    page,
    setPage,
    totalPages,
  };
};

export const handleTeacherClick = (teacher, setSelectedTeacher, setAvatar) => {
  setSelectedTeacher({
    name: teacher.name,
    email: teacher.email,
    password: teacher.password,
    level: teacher.level,
    startDate: teacher.startDate,
    endDate: teacher.endDate,
    avatar: teacher.avatar,
    status: teacher.status,
    id: teacher.id,
  });
  setAvatar(teacher.avatar);
};

export const handleDetailClick = (
  teacher,
  setOpenProfile,
  handleTeacherClick
) => {
  handleTeacherClick(teacher);
  setOpenProfile(true);
};

export const generatePassword = () => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};

export const handleImageChange = (
  event,
  selectedTeacher,
  setSelectedTeacher,
  setAvatarFile
) => {
  const file = event.target.files[0];
  if (file) {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedTeacher({
        ...selectedTeacher,
        avatar: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
};

export const handleAddTeacher = async (
  selectedTeacher,
  teachers,
  setTeachers,
  setFilteredTeachers,
  setSelectedTeacher,
  avatarFile,
  setIsNew,
  setReload,
  setPage,
  setIsLoading
) => {
  if (
    !selectedTeacher.name.trim() ||
    !selectedTeacher.email.trim() ||
    !selectedTeacher.level.trim()
  ) {
    toast.error("Please fill in all required fields: Name, Email, and Level.");
    return;
  }
  setIsLoading(true);
  try {
    let newavatar = null;

    if (avatarFile) {
      newavatar = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(avatarFile);
      });
    }

    const newImage = avatarFile
      ? await handleFileUpload(null, newavatar, selectedTeacher.email, "teacher/signup")
      : "/header_student"; 

    const newTeacherData = {
      name: selectedTeacher.name,
      email: selectedTeacher.email,
      password: generatePassword(),
      startDate: selectedTeacher.startDate || new Date().toISOString().split("T")[0], 
      level: selectedTeacher.level,
      avatar: newImage,
      status: "ACTIVE",
    };

    const createdTeacher = await createTeacher(newTeacherData);

    setTeachers([...teachers, createdTeacher]);
    setFilteredTeachers([...teachers, createdTeacher]);

    setSelectedTeacher({
      name: "",
      email: "",
      level: "",
      avatar: "",
      status: "",
    });

    setIsNew(false);
    setReload((prev) => !prev);
    setPage(0);
    toast.success("Add new teacher successfully")
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "An unexpected error occurred. Please try again."
    );
    console.error(error);
  }
  finally {
    setIsLoading(false); 
  }
};

export const handleEditToggle = (selectedTeacher, setIsEditing) => {
  if (
    selectedTeacher.id &&
    selectedTeacher.name?.trim() &&
    selectedTeacher.email?.trim()
  ) {
    setIsEditing((prev) => !prev);
  } else {
    toast.error("Please ensure all required fields are filled before editing.");
  }
};

export const handleNewToggle = (
  setIsNew,
  setSelectedTeacher,
  setAvatarFile
) => {
  setIsNew(true);
  setSelectedTeacher({
    name: "",
    email: "",
    level: "",
    startDate: "",
    endDate: "",
    avatar: "",
    status: "",
  });
  setAvatarFile(null);
};

export const handleSaveEdit = async (
  selectedTeacher,
  teachers,
  setTeachers,
  setFilteredTeachers,
  setIsEditing,
  avatarFile,
  setReload,
  setPage
) => {
  try {
    let userInfo = await fetchUserInfo();
    let id = selectedTeacher.id;

    let newAvatar = null;
    if (avatarFile) {
      newAvatar = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(avatarFile);
      });
    }

    const newImage = newAvatar
      ? await handleFileUpload(
          userInfo.avatar,
          newAvatar,
          selectedTeacher.email,
          "teacher/signup"
        )
      : userInfo.avatar;

    const updatedUserData = {
      id: selectedTeacher.id,
      name: selectedTeacher.name,
      level: selectedTeacher.level,
      avatar: newImage,
    };

    await updateUser(updatedUserData, id);

    const updatedTeachers = teachers.map((teacher) =>
      teacher.id === selectedTeacher.id
        ? { ...selectedTeacher, avatar: newImage }
        : teacher
    );

    setTeachers(updatedTeachers);
    setFilteredTeachers(updatedTeachers);
    toast.success("Teacher information updated successfully!");
    setIsEditing(false);
    setReload((prev) => !prev);
    setPage(0);
  } catch (error) {
    console.error("Error updating teacher:", error);
    toast.error(
      "An error occurred while updating the teacher's information. Please try again."
    );
  }
};
