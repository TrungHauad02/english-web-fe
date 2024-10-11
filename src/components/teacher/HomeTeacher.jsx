import { Stack } from "@mui/material";
import HeaderTeacher from "./header/HeaderTeacher";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";

export default function HomeTeacher() {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{
        height: "100%",
        pt: "4rem",
        marginBottom: "-5px",
        minHeight: "90vh",
      }}
    >
      <HeaderTeacher />
      <Outlet />
      <Footer />
    </Stack>
  );
}
