import { Stack } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeStudent from "./student/HomeStudent";
import Account from "./account/Account";

function Home(){
    return (
        <Stack>
            <BrowserRouter>
                <Routes>
                    <Route path="/student/*" element={<HomeStudent/>}>
                        <Route path="list-topic"/>
                        <Route path="grammar"/>
                    </Route>
                    <Route path="/" element={<Navigate to="/student"/>}/>
                    <Route path="/account" element={<Account/>} />
                </Routes>
            </BrowserRouter>
        </Stack>
    )
}

export default Home;