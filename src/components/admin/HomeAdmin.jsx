import { Stack } from "@mui/material";
import HeaderAdmin from "./header/HeaderAdmin.jsx";
import Footer from "../footer/Footer";
import { Route, Routes } from "react-router-dom";
import ManageTeacher from "./teacher/ManageTeacher.jsx";
import ManageStudent from "./student/ManageStudent.jsx";
function HomeAdmin() {
    return (
        <Stack
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%", pt: "4rem", marginBottom: "-5px" }}
        >
            <HeaderAdmin />
            <Routes>
                <Route path="teacher" element={<ManageTeacher />} />
                <Route path="student" element={<ManageStudent />} />
            </Routes>
            <Footer />
        </Stack>
    );
}

export default HomeAdmin;