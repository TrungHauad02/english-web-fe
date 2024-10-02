import { Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeStudent from "./student/HomeStudent";
import HomeTeacher from "./teacher/HomeTeacher";
import HomeAdmin from "./admin/HomeAdmin";

function Home() {
  return (
    <Stack>
      <BrowserRouter>
        <Routes>
          <Route path="/student/*" element={<HomeStudent />}>
            <Route path="list-topic" />
            <Route path="grammar" />
          </Route>
          <Route path="/teacher/*" element={<HomeTeacher />}></Route>
          <Route path="/admin/*" element={<HomeAdmin/>}></Route>
          <Route path="/" element={<Navigate to="/student" />} />
        </Routes>
      </BrowserRouter>
    </Stack>
  );
}

export default Home;
