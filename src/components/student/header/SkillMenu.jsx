import React, { useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function SkillMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMouseEnterButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseEnterMenu = () => {
    setAnchorEl(anchorEl);
  };

  const handleMouseLeaveMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnterButton}
      onMouseLeave={handleMouseLeaveMenu}
    >
      <Button
        id="skill-button"
        aria-controls={open ? "skill-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={() => {
          console.log("Button clicked");
          navigate("/student/skill");
        }}
        sx={{
          color: "#fff",
          textTransform: "none",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        Skill
      </Button>
      <Menu
        id="skill-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMouseLeaveMenu}
        disableScrollLock
        MenuListProps={{
          "aria-labelledby": "skill-button",
          onMouseEnter: handleMouseEnterMenu,
          onMouseLeave: handleMouseLeaveMenu,
        }}
      >
        <MenuItem
          onClick={handleMouseLeaveMenu}
          component={Link}
          to="/student/readings"
        >
          Reading
        </MenuItem>
        <MenuItem
          onClick={handleMouseLeaveMenu}
          component={Link}
          to="/student/speakings"
        >
          Speaking
        </MenuItem>
        <MenuItem
          onClick={handleMouseLeaveMenu}
          component={Link}
          to="/student/writings"
        >
          Writing
        </MenuItem>
        <MenuItem
          onClick={handleMouseLeaveMenu}
          component={Link}
          to="/student/listenings"
        >
          Listening
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default SkillMenu;
