import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import Footer from "../../shared/footer/Footer";
import React from "react";

function HomeStudent() {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%", pt: "4rem", marginBottom: "-5px" }}
    >
      <HeaderStudent />
      <Stack
        direction="column"
        flexGrow={1}
        justifyContent="flex-start"
        sx={{ overflowY: "auto" }}
      >
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
}

export default HomeStudent;
