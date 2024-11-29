import React, { useState, useEffect } from "react";
import { Stack, Menu, MenuItem, IconButton } from "@mui/material";
import HeaderTypography from "shared/component/header/HeaderTypography";
import Profile from "shared/profile/Profile";
import useColor from "shared/color/Color";
import { useHeaderTeacherHandlers } from "./common/handoleHeacerTeacher";
import { fetchUserInfo } from "api/user/userService";

const icon = "/icon.png";

function HeaderTeacher() {
  const { HeaderBg } = useColor();
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const userInfo = await fetchUserInfo();
        setAvatar(userInfo.avatar || "/header_user.png");
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setAvatar("/header_user.png");
      }
    };
    loadUserInfo();
  }, []);
  const {
    anchorEl,
    openProfileDialog,
    handleMenuClick,
    handleMenuClose,
    handleLogout,
    handleProfileOpen,
    handleProfileClose,
    navigate,
    isAuthenticated,
  } = useHeaderTeacherHandlers();

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: HeaderBg,
        color: "#fff",
        padding: "0.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={5}>
        <img
          src={icon}
          alt="icon"
          style={{ width: "50px", marginLeft: "1rem", cursor: "pointer" }}
          onClick={() => navigate("/teacher")}
        />
        <HeaderTypography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/teacher")}
        >
          H2T English
        </HeaderTypography>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <IconButton onClick={handleMenuClick}>
        <img
            src={avatar}
            alt="User Icon"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          disableScrollLock
          sx={{
            "& .MuiMenu-paper": {
              background: "#75718D",
              padding: ".2rem 1rem",
              borderRadius: "1.5rem",
            },
          }}
        >
          <MenuItem onClick={handleProfileOpen} sx={{ borderBottom: "1px solid rgba(255, 255, 255, 0.5)", color: "white" }}>
            Profile
          </MenuItem>
          {isAuthenticated && (
            <MenuItem onClick={handleLogout} sx={{ color: "red", fontWeight: "bold" }}>
              Logout
            </MenuItem>
          )}
        </Menu>
      </Stack>

      <Profile open={openProfileDialog} handleClose={handleProfileClose} />
    </Stack>
  );
}

export default HeaderTeacher;
