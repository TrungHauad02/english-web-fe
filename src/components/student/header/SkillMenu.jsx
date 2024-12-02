import React, { useState, useRef } from "react";
import { Box, Button, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";

function SkillMenu() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); 
  const open = Boolean(anchorEl);
  const [height, setHeight] = useState(50);
  const location = useLocation();
  const isActivePath = (path) => location.pathname === path; 
  const menuRef = useRef(null);
  const buttonRef = useRef(null);  

  const handleMouseEnterMenu = () => {
    setAnchorEl(buttonRef.current);  
    setHeight(300);
  };

  const handleMouseLeaveMenu = (event) => {
    if (
      buttonRef.current && !buttonRef.current.contains(event.relatedTarget) && 
      menuRef.current && !menuRef.current.contains(event.relatedTarget)
    ) {
      setAnchorEl(null);  
    }
  };

  return (
    <Box sx={{ width: 100, height: height }} ref={menuRef} onMouseLeave={handleMouseLeaveMenu}>
      <Button
        ref={buttonRef}  
        id="skill-button"
        aria-controls={open ? "skill-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={() => {
          navigate("/student/skill");
        }}
        onMouseEnter={handleMouseEnterMenu}
        sx={{
          backgroundColor: isActivePath("/student/skill") ? "#fff" : "transparent",
          color: isActivePath("/student/skill") ? "#4A475C" : "white",
          textDecoration: "none",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: isActivePath("/student/skill")
              ? "#fff"
              : "rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        Skill
      </Button>
      {open && (
        <Box sx={{backgroundColor: '#fff', width: 100, position: 'absolute', top: 60, color:'#000', borderRadius: 2}} ref={menuRef}>
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/student/readings" onClick={handleMouseLeaveMenu}>
                <ListItemText primary="Reading" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/student/speakings" onClick={handleMouseLeaveMenu}>
                <ListItemText primary="Speaking" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/student/writings" onClick={handleMouseLeaveMenu}>
                <ListItemText primary="Writing" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/student/listenings" onClick={handleMouseLeaveMenu}>
                <ListItemText primary="Listening" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      )}
    </Box>
  );
}

export default SkillMenu;
