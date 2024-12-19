import React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";

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
  return (
    <>
      <IconButton onClick={handleMenuClick}>
        <img
          src={loading ? "/header_user.png" : avatar}
          alt="User Icon"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/header_user.png";
          }}
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
    </>
  );
}

export default UserMenu;
