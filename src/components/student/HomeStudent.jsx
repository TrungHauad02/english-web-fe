import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./common/ListTopic";
import Footer from "../footer/Footer";
import site from "./common/Pages";
import React from "react";
import ListTest from "./common/Test/ListTest";
import ListTest_Skill from "./common/Test/ListTest_Skill";


function HomeStudent(){
    const componentMap = {
        'ListTopic': ListTopic,
        'ListTest': ListTest,
        'ListTest_Skill': ListTest_Skill,
       
    };
    return (
        <Stack direction="column" justifyContent="space-between" sx={{ height: '100%' }}>
            <HeaderStudent/>
            <Stack direction="column" flexGrow={1} justifyContent="flex-start" sx={{ overflowY: 'auto' }}>
                <Routes>
                {
                    site.map((page) => (
                        <Route 
                            key={page.id} 
                            path={page.path} 
                            element={React.createElement(componentMap[page.file], {
                                list: page.list,
                                bg: page.bg,
                                title: page.title,
                                quote: page.quote,
                            })} 
                        />
                    ))
                }
                </Routes>
                <Outlet />
            </Stack>
            <Footer/>
        </Stack>
    )
}

export default HomeStudent;