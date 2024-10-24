import React, { useState, useEffect } from "react";
import { Button, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import HeaderTypography from "../../common/header/HeaderTypography";
import SkillMenu from "./SkillMenu";
import Profile from "./Profile";

function HeaderStudent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook để lấy đường dẫn hiện tại

  useEffect(() => {
    const checkLoggedIn = () => {
      const loggedIn = localStorage.getItem("isSignIn") === "true";
      setIsLoggedIn(loggedIn);
    };

    checkLoggedIn();
    window.addEventListener("storage", checkLoggedIn);

    return () => {
      window.removeEventListener("storage", checkLoggedIn);
    };
  }, []);

  const handleMenuClick = (event) => {
    if (isLoggedIn) {
      setAnchorEl(event.currentTarget);
    } else {
      navigate("/student/account");
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("isSignIn");
    setIsLoggedIn(false);
    handleMenuClose();
    navigate("/student/account");
  };

  const handleProfileOpen = () => {
    setOpenProfileDialog(true);
    handleMenuClose();
  };

  const handleProfileClose = () => {
    setOpenProfileDialog(false);
  };

  const isActivePath = (path) => location.pathname === path; // Kiểm tra xem đường dẫn hiện tại có phải là đường dẫn của nút không

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: "#6EC2F7",
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
          src="icon.png"
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
          English Web
        </HeaderTypography>
      </Stack>

      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          component={NavLink}
          to="/student/topics"
          sx={{
            backgroundColor: isActivePath("/student/topics")
              ? "#fff"
              : "transparent",
            color: isActivePath("/student/topics") ? "#4A475C" : "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: isActivePath("/student/topics")
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
            backgroundColor: isActivePath("/student/grammars")
              ? "#fff"
              : "transparent",
            color: isActivePath("/student/grammars") ? "#4A475C" : "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: isActivePath("/student/grammars")
                ? "#fff"
                : "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <HeaderTypography>Grammar</HeaderTypography>
        </Button>

        <SkillMenu />

        <Button
          component={NavLink}
          to="/student/test"
          sx={{
            backgroundColor: isActivePath("/student/test")
              ? "#fff"
              : "transparent",
            color: isActivePath("/student/test") ? "#4A475C" : "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: isActivePath("/student/test")
                ? "#fff"
                : "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <HeaderTypography>Test</HeaderTypography>
        </Button>

        <IconButton onClick={handleMenuClick}>
          <img
            src="/header_user.png"
            alt="User Icon"
            style={{ width: "40px" }}
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
            onClick={() => navigate("/student/study-schedule")}
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
              color: "white",
            }}
          >
            Study Schedule
          </MenuItem>
          <MenuItem
            onClick={() => navigate("/student/history-test")}
            sx={{
              borderBottom: "3px solid #ffff",
              color: "white",
            }}
          >
            History Test
          </MenuItem>
          {isLoggedIn && (
            <MenuItem
              onClick={handleLogout}
              sx={{
                color: "red",
                fontWeight: "bold",
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
