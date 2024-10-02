import React, { useState, useEffect } from "react";
import { Button, Stack, Menu, MenuItem, IconButton } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import HeaderTypography from "../../common/header/HeaderTypography";
import SkillMenu from "./SkillMenu";
import Profile from "./Profile";

function HeaderStudent() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openProfileDialog, setOpenProfileDialog] = useState(false);
  const [openHistoryTest, setOpenHistoryTest] = useState(false);
  const [openStudySchedule, setOpenStudySchedule] = useState(false);
  const navigate = useNavigate();

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
    setAnchorEl(event.currentTarget);
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

  const handleHistoryTestOpen = () => {
    setOpenHistoryTest(true);
    navigate("/student/history-test");
    handleMenuClose();
  };

  const handleStudyScheduleOpen = () => {
    setOpenStudySchedule(true);
    navigate("/student/study-schedule");
    handleMenuClose();
  };

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: "#4A475C",
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
          style={{ width: "50px", marginLeft: "1rem" }}
        />
        <HeaderTypography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
          }}
        >
          English Web
        </HeaderTypography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          component={NavLink}
          to="/student"
          sx={{
            backgroundColor: "transparent",
            color: "white",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
            // "&.active": {
            //   backgroundColor: "white",
            //   color: "black",
            // },
          }}
        >
          <HeaderTypography>Home</HeaderTypography>
        </Button>

        {isLoggedIn ? (
          <>
            <Button
              component={NavLink}
              to="/student/list-topic"
              sx={{
                backgroundColor: "transparent",
                color: "white",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&.active": {
                  backgroundColor: "white",
                  color: "black",
                },
              }}
            >
              <HeaderTypography>Vocabulary</HeaderTypography>
            </Button>
            <Button
              component={NavLink}
              to="/student/grammar"
              sx={{
                backgroundColor: "transparent",
                color: "white",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&.active": {
                  backgroundColor: "white",
                  color: "black",
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
                backgroundColor: "transparent",
                color: "white",
                textDecoration: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
                "&.active": {
                  backgroundColor: "white",
                  color: "black",
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
                onClick={handleStudyScheduleOpen}
                sx={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                  color: "white",
                }}
              >
                Study Schedule
              </MenuItem>
              <MenuItem
                onClick={handleHistoryTestOpen}
                sx={{
                  borderBottom: "3px solid #ffff",
                  color: "white",
                }}
              >
                History Test
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button
            component={NavLink}
            to="/student/account"
            sx={{
              backgroundColor: "transparent",
              color: "white",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
              },
              "&.active": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            <HeaderTypography>Sign In</HeaderTypography>
          </Button>
        )}
      </Stack>

      <Profile open={openProfileDialog} handleClose={handleProfileClose} />
    </Stack>
  );
}

export default HeaderStudent;
