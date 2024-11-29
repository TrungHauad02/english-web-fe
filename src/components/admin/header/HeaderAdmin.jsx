import React from "react";
import { Button, Stack } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import HeaderTypography from "../../../shared/component/header/HeaderTypography";
import { useAuth } from "../../../security/AuthContext";
import useColor from "shared/color/Color";

const icon = "/icon.png";

function HeaderAdmin() {
  const navigate = useNavigate();
  const auContext = useAuth();
  const handleLogout = () => {
    auContext.Logout();
    navigate("/account");
  };
  const {HeaderBg} = useColor();

  return (
    <Stack
      direction={"row"}
      justifyContent={"space-between"}
      sx={{
        backgroundColor: HeaderBg,
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
          src={icon }
          alt="icon"
          style={{ width: "50px", marginLeft: "1rem" }}
          onClick={() => navigate("/admin")}
        />
        <HeaderTypography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: "bold",
            fontSize: "2rem",
          }}
          onClick={() => navigate("/admin")}
        >
          H2T English
        </HeaderTypography>
      </Stack>
      <Stack direction={"row"} alignItems={"center"} spacing={2}>
        <Button
          component={NavLink}
          to="teacher"
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
          <HeaderTypography>Teacher</HeaderTypography>
        </Button>

        <Button
          component={NavLink}
          to="student"
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
          <HeaderTypography>Student</HeaderTypography>
        </Button>

        <Button
          onClick={handleLogout}
          sx={{
            backgroundColor: "transparent",
            color: "red",
            textDecoration: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <HeaderTypography>Logout</HeaderTypography>
        </Button>
      </Stack>
    </Stack>
  );
}

export default HeaderAdmin;
