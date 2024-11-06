import { Stack } from "@mui/material";
import HeaderAdmin from "./header/HeaderAdmin";
import Footer from "../../shared/footer/Footer";
import { Outlet } from "react-router-dom";

export default function HomeAdmin() {
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
      <HeaderAdmin />
      <Outlet />
      <Footer />
    </Stack>
  );
}
