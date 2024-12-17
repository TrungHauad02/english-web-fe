import React, { useState, useEffect } from "react";
import { Button, Stack, Menu, MenuItem, IconButton, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import HeaderTypography from "shared/component/header/HeaderTypography";
import SkillMenu from "./SkillMenu";
import Profile from "../../../shared/profile/Profile";
import useColor from "shared/color/Color";
import { useHeaderStudentHandlers } from "./common/HandleHeaderStudent";
import { fetchUserInfo } from "api/user/userService";

const icon = "/icon.png";

function HeaderStudent() {
  const { HeaderBg } = useColor();
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);
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
  const {
    anchorEl,
    openProfileDialog,
    handleMenuClick,
    handleMenuClose,
    handleLogout,
    handleProfileOpen,
    handleProfileClose,
    isActivePath,
    navigate,
    isAuthenticated,
  } = useHeaderStudentHandlers();

  const location = useLocation();

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
          onClick={() => navigate("/student")}
        />
        <HeaderTypography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
            cursor: "pointer",
          }}
          onClick={() => navigate("/student")}
        >
          H2T English
        </HeaderTypography>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          component={NavLink}
          to="/student/topics"
          sx={{
            backgroundColor: isActivePath(location, "/student/topics")
              ? "#fff"
              : "transparent",
            color: isActivePath(location, "/student/topics")
              ? "#4A475C"
              : "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            textTransform: "none",
            fontSize: "10rem",
            "&:hover": {
              backgroundColor: isActivePath(location, "/student/topics")
                ? "#fff"
                : "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <HeaderTypography>Vocabulary</HeaderTypography>
        </Button>
        <Button
          component={NavLink}
          to="/student/grammars"
          sx={{
            backgroundColor: isActivePath(location, "/student/grammars")
              ? "#fff"
              : "transparent",
            color: isActivePath(location, "/student/grammars")
              ? "#4A475C"
              : "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: isActivePath(location, "/student/grammars")
                ? "#fff"
                : "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <HeaderTypography>Grammar</HeaderTypography>
        </Button>

        <Box sx={{ width: 70, height: 40 }}>
          <SkillMenu />
        </Box>

        <Button
          component={NavLink}
          to="/student/tests"
          sx={{
            backgroundColor: isActivePath(location, "/student/tests")
              ? "#fff"
              : "transparent",
            color: isActivePath(location, "/student/tests")
              ? "#4A475C"
              : "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            textTransform: "none",
            "&:hover": {
              backgroundColor: isActivePath(location, "/student/tests")
                ? "#fff"
                : "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <HeaderTypography>Test</HeaderTypography>
        </Button>

        <IconButton onClick={handleMenuClick}>
          <img
            src={loading ? "/header_user.png" : avatar}
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
          <MenuItem
            onClick={handleProfileOpen}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              color: "white",
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/student/history-test")}
            sx={{ borderBottom: "3px solid #ffff", color: "white" }}
          >
            History Test
          </MenuItem>
          {isAuthenticated && (
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "#000",
                fontWeight: "bold",
                "&:hover": {
                  color: "#df4242",
                },
              }}
            >
              Logout
            </MenuItem>
          )}
        </Menu>
      </Stack>
      <Profile open={openProfileDialog} handleClose={handleProfileClose} />
    </Stack>
  );
}

export default HeaderStudent;
