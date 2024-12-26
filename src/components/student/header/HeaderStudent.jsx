import React from "react";
import { Button, Stack, Box } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import HeaderTypography from "shared/component/header/HeaderTypography";
import SkillMenu from "./common/SkillMenu";
import Profile from "shared/profile/Profile";
import useColor from "shared/color/ColorVer2";
import { useHeaderStudentHandlers } from "./common/HandleHeaderStudent";
import UserMenu from "./common/UserMenu";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "theme/ThemeContext";

const icon = "/icon.png";
const NAV_LINKS = [
  { path: "/student/tests", label: "Test" },
  { path: "/student/topics", label: "Vocabulary" },
  { path: "/student/grammars", label: "Grammar" },
];

function HeaderStudent() {
  const color = useColor();
  const { darkMode, toggleDarkMode } = useTheme();
  const location = useLocation();
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

  const linkStyles = (isActive, darkMode, color) => {
    let textColor, bgColor, hoverBgColor;

    if (isActive && darkMode) {
      // Trường hợp active trong darkmode
      textColor = color.gray950;
      bgColor = color.gray200;
      hoverBgColor = color.gray200;
    } else if (isActive && !darkMode) {
      // Trường hợp active trong lightmode
      textColor = color.white;
      bgColor = color.gray700;
      hoverBgColor = color.gray700;
    } else if (!isActive && darkMode) {
      // Trường hợp không active trong darkmode
      textColor = color.white;
      bgColor = "transparent";
      hoverBgColor = `${color.gray200}30`;
    } else {
      // Trường hợp không active trong lightmode
      // textColor = color.gray950;
      textColor = color.white;
      bgColor = "transparent";
      hoverBgColor = `${color.gray100}50`;
    }

    return {
      color: textColor,
      backgroundColor: bgColor,
      "&:hover": {
        backgroundColor: hoverBgColor,
      },
    };
  };

  const renderNavLink = (path, label) => {
    const isActive = isActivePath(location, path);
    const styles = linkStyles(isActive, darkMode, color);
    return (
      <Button
        component={NavLink}
        to={path}
        sx={{
          ...styles,
          textDecoration: "none",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          textTransform: "none",
        }}
      >
        <HeaderTypography>{label}</HeaderTypography>
      </Button>
    );
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        backgroundColor: `${color.teal700}99`,
        color: color.white,
        padding: "0.5rem",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        boxShadow: `0px 2px 4px ${color.gray500}`,
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
        {/* <Button
          onClick={toggleDarkMode}
          sx={{ color: darkMode ? "#fff" : "#000" }}
        >
          {darkMode ? (
            <DarkModeIcon onClick={toggleDarkMode} />
          ) : (
            <LightModeIcon onClick={toggleDarkMode} />
          )}
        </Button> */}
      </Stack>

      <Profile open={openProfileDialog} handleClose={handleProfileClose} />
    </Stack>
  );
}

export default HeaderStudent;
