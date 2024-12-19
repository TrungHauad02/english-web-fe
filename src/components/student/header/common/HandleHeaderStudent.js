import { useNavigate } from "react-router-dom";
import { useAuth } from "security/AuthContext";
import { useEffect, useState } from "react";
import { fetchUserInfo } from "api/user/userService";

export const useHeaderStudentHandlers = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, Logout } = useAuth();
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setAvatar(userInfo.avatar || "/header_user.png");
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setAvatar("/header_user.png");
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, []);
  const handleMenuClick = (event) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/account");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    Logout();
    handleMenuClose();
    navigate("/account");
  };

  const handleProfileOpen = () => {
    setOpenProfileDialog(true);
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setOpenProfileDialog(false);
  };

  const isActivePath = (location, path) => location.pathname === path;

  return {
    anchorEl,
    setAnchorEl,
    openProfileDialog,
    setOpenProfileDialog,
    navigate,
    isAuthenticated,
    handleMenuClick,
    handleMenuClose,
    handleLogout,
    handleProfileOpen,
    handleProfileClose,
    isActivePath,
    loading,
    avatar,
  };
};
