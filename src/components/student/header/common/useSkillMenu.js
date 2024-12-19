import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useSkillMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [height, setHeight] = useState(50);
  const location = useLocation();
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const isActivePath = (path) => location.pathname === path;

  const handleMouseEnterMenu = () => {
    setAnchorEl(buttonRef.current);
    setHeight(300);
  };

  const handleMouseLeaveMenu = (event) => {
    const relatedTarget = event.relatedTarget;

    if (
      !relatedTarget ||
      !(relatedTarget instanceof Node) ||
      (buttonRef.current &&
        !buttonRef.current.contains(relatedTarget) &&
        menuRef.current &&
        !menuRef.current.contains(relatedTarget))
    ) {
      setAnchorEl(null);
    }
  };

  return {
    height,
    menuRef,
    handleMouseLeaveMenu,
    buttonRef,
    open,
    handleMouseEnterMenu,
    isActivePath,
  };
}
