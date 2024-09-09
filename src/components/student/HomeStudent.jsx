import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./vocabulary/ListTopic";
import ListGrammar from "./grammar/ListGrammar";

function HomeStudent(){
    return (
        <Stack>
            <HeaderStudent/>
            <Routes>
                <Route path="list-topic" element={<ListTopic />}/>
                <Route path="grammar" element={<ListGrammar />}/>
            </Routes>
            <Outlet />
        </Stack>
    )
}

export default HomeStudent;