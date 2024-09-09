import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

function SkillMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="skill-button"
        aria-controls={open ? 'skill-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          color: '#fff',
          textTransform: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
        }}
      >
        Skill
      </Button>
      <Menu
        id="skill-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'skill-button',
        }}
      >
        <MenuItem onClick={handleClose} component="a" href="/student/skill/reading">
          Reading
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/student/skill/speaking">
          Speaking
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/student/skill/writing">
          Writing
        </MenuItem>
        <MenuItem onClick={handleClose} component="a" href="/student/skill/listening">
          Listening
        </MenuItem>
      </Menu>
    </>
  );
}

export default SkillMenu;
