import React from "react";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import useSkillMenu from "./useSkillMenu";
import { useTheme } from "theme/ThemeContext";
import useColor from "shared/color/ColorVer2";

function SkillMenu() {
  const navigate = useNavigate();
  const {
    height,
    menuRef,
    handleMouseLeaveMenu,
    buttonRef,
    open,
    handleMouseEnterMenu,
    isActivePath,
  } = useSkillMenu();
  const { darkMode } = useTheme();
  const color = useColor();

  // Danh sách các mục menu
  const menuItems = [
    { path: "/student/readings", label: "Reading" },
    { path: "/student/speakings", label: "Speaking" },
    { path: "/student/writings", label: "Writing" },
    { path: "/student/listenings", label: "Listening" },
  ];

  const linkStyles = (isActive) => {
    let textColor, bgColor, hoverBgColor;
    if (isActive && darkMode) {
      // Trường hợp active + dark mode
      textColor = color.gray950;
      bgColor = color.gray200;
      hoverBgColor = color.gray200;
    } else if (isActive && !darkMode) {
      // Trường hợp active + light mode
      textColor = color.white;
      bgColor = color.gray700;
      hoverBgColor = color.gray700;
    } else if (!isActive && darkMode) {
      // Trường hợp inactive + dark mode
      textColor = color.white;
      bgColor = "transparent";
      hoverBgColor = `${color.gray200}30`;
    } else {
      // Trường hợp inactive + light mode
      textColor = color.gray950;
      bgColor = "transparent";
      hoverBgColor = `${color.gray200}80`;
    }

    return {
      color: textColor,
      backgroundColor: bgColor,
      "&:hover": {
        backgroundColor: hoverBgColor,
      },
    };
  };

  return (
    <Box
      sx={{ width: 100, height: height }}
      ref={menuRef}
      onMouseLeave={handleMouseLeaveMenu}
    >
      <Button
        ref={buttonRef}
        id="skill-button"
        aria-controls={open ? "skill-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={() => navigate("/student/skill")}
        onMouseEnter={handleMouseEnterMenu}
        sx={{
          ...linkStyles(isActivePath("/student/skill")),
          textDecoration: "none",
          marginTop: "-0.25rem",
          padding: "1.25rem 1rem",
          borderRadius: "0.5rem",
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1.25rem",
          lineHeight: 0.5,
          color: color.white,
        }}
      >
        Skill
      </Button>
      {open && (
        <Box
          sx={{
            backgroundColor: "#fff",
            width: 100,
            position: "absolute",
            top: 60,
            color: "#000",
            borderRadius: 2,
          }}
          ref={menuRef}
        >
          <List>
            {menuItems.map(({ path, label }) => (
              <ListItem disablePadding key={path}>
                <ListItemButton
                  component={Link}
                  to={path}
                  onClick={handleMouseLeaveMenu}
                  sx={{
                    ...linkStyles(isActivePath(path)),
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                  }}
                >
                  <ListItemText primary={label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default SkillMenu;
