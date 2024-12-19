import React from "react";
import { Button, Stack, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import HeaderTypography from "shared/component/header/HeaderTypography";
import SkillMenu from "./common/SkillMenu";
import Profile from "shared/profile/Profile";
import useColor from "shared/color/Color";
import { useHeaderStudentHandlers } from "./common/HandleHeaderStudent";
import UserMenu from "./common/UserMenu";

const icon = "/icon.png";
const NAV_LINKS = [
  { path: "/student/tests", label: "Test" },
  { path: "/student/topics", label: "Vocabulary" },
  { path: "/student/grammars", label: "Grammar" },
];

function HeaderStudent() {
  const { HeaderBg } = useColor();
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
    loading,
    avatar,
  } = useHeaderStudentHandlers();
  const location = useLocation();

  const renderNavLink = (path, label) => (
    <Button
      component={NavLink}
      to={path}
      sx={{
        backgroundColor: isActivePath(location, path) ? "#fff" : "transparent",
        color: isActivePath(location, path) ? "#4A475C" : "white",
        textDecoration: "none",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        textTransform: "none",
        "&:hover": {
          backgroundColor: isActivePath(location, path)
            ? "#fff"
            : "rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <HeaderTypography>{label}</HeaderTypography>
    </Button>
  );

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        backgroundColor: `${HeaderBg}99`,
        color: "#fff",
        padding: "0.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={5}>
        <img
          src={icon}
          alt="icon"
          style={{ width: "50px", marginLeft: "1rem", cursor: "pointer" }}
          onClick={() => navigate("/student")}
        />
        <HeaderTypography
          variant="h4"
          component="h1"
          sx={{ fontWeight: "bold", fontSize: "2rem", cursor: "pointer" }}
          onClick={() => navigate("/student")}
        >
          H2T English
        </HeaderTypography>
      </Stack>

      <Stack direction="row" alignItems="center" spacing={2}>
        {NAV_LINKS.map(({ path, label }) => renderNavLink(path, label))}

        <Box sx={{ width: 70, height: 40 }}>
          <SkillMenu />
        </Box>

        <UserMenu
          loading={loading}
          avatar={avatar}
          anchorEl={anchorEl}
          isAuthenticated={isAuthenticated}
          handleMenuClick={handleMenuClick}
          handleMenuClose={handleMenuClose}
          handleProfileOpen={handleProfileOpen}
          handleLogout={handleLogout}
          navigate={navigate}
        />
      </Stack>
      <Profile open={openProfileDialog} handleClose={handleProfileClose} />
    </Stack>
  );
}

export default HeaderStudent;
