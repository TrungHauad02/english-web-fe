import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { useTheme } from "theme/ThemeContext";
import useColor from "shared/color/ColorVer2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function UserMenu({
  loading,
  avatar,
  anchorEl,
  isAuthenticated,
  handleMenuClick,
  handleMenuClose,
  handleProfileOpen,
  handleLogout,
  navigate,
}) {
  const { darkMode } = useTheme();
  const color = useColor();

  return (
    <>
      <IconButton onClick={handleMenuClick}>
        {loading && avatar ? (
          <img
            src={avatar}
            alt="User Icon"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
            }}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        ) : (
          <AccountCircleIcon
            sx={{
              fontSize: "2rem",
              color: darkMode ? color.white : color.black,
            }}
          />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        disableScrollLock
        sx={{
          "& .MuiMenu-paper": {
            background: darkMode ? color.gray950 : color.gray100,
            padding: "0.2rem 1rem",
            borderRadius: "1.5rem",
          },
        }}
      >
        <MenuItem
          onClick={handleProfileOpen}
          sx={{
            borderBottom: `1px solid ${darkMode ? color.white : color.black}`,
            color: darkMode ? color.white : color.black,
            "&:hover": {
              bgcolor: darkMode ? color.gray100 + "20" : color.gray500 + "20",
            },
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/student/history-test")}
          sx={{
            borderBottom: `3px solid ${darkMode ? color.white : color.black}`,
            color: darkMode ? color.white : color.black,
            "&:hover": {
              bgcolor: darkMode ? color.gray100 + "20" : color.gray500 + "20",
            },
          }}
        >
          History Test
        </MenuItem>
        {isAuthenticated && (
          <MenuItem
            onClick={handleLogout}
            sx={{
              color: darkMode ? color.white : color.black,
              fontWeight: "bold",
              "&:hover": {
                color: color.red,
              },
            }}
          >
            Logout
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

export default UserMenu;
