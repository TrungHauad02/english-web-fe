import { useNavigate } from "react-router-dom";
import { useAuth } from "security/AuthContext";
import { useState } from "react";

export const useHeaderStudentHandlers = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, Logout } = useAuth();

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
  };
};
