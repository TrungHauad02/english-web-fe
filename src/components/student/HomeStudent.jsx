import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./common/ListTopic";
import Footer from "../footer/Footer";
import site from "./common/Pages";
import Vocabulary from "./vocabulary/Vocabulary";

function HomeStudent(){
    return (
        <Stack direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
            <HeaderStudent/>
            <Stack direction="column" flexGrow={1} justifyContent="flex-start" sx={{ overflowY: 'auto' }}>
                <Routes>
                {
                    site.map((page) => (
                        <Route key={page.id} path={page.path} 
                            element={<ListTopic list={page.list} bg={page.bg} title={page.title} quote={page.quote} />} />
                    ))
                }
                <Route path="/list-topic/1" element={<Vocabulary/>}/>
                </Routes>
                <Outlet />
            </Stack>
            <Footer/>
        </Stack>
    )
}

export default HomeStudent;