import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./vocabulary/ListTopic";
import ListGrammar from "./grammar/ListGrammar";
import Footer from "../footer/Footer";

function HomeStudent(){
    return (
        <Stack direction="column" justifyContent="space-between" sx={{ height: '100vh' }}>
            <HeaderStudent/>
            <Routes>
                <Route path="list-topic" element={<ListTopic />}/>
                <Route path="grammar" element={<ListGrammar />}/>
            </Routes>
            <Outlet/>
            <Footer/>
        </Stack>
    )
}

export default HomeStudent;