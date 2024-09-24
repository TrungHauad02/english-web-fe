import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./common/listTopic/ListTopic";
import Footer from "../footer/Footer";
import site from "./common/Pages";
import Vocabulary from "./vocabulary/Vocabulary";
import React from "react";
import ListTest from "./Test/ListTest";
import ListTest_Skill from "./Test/ListTest_Skill";
import TestReading from "./Test/TestReading";
import TestListening from "./Test/TestListening";
import TestWriting from "./Test/TestWriting";
import TestSpeaking from "./Test/TestSpeaking";

import Grammar from "./grammar/Grammar";
import HomePageStudent from "./content/HomePageStudent";
import Account from "./account/Account";
import Reading from "./skill/reading/Reading";
import Listening from "./skill/listening/Listening";
import Speaking from "./skill/speaking/Speaking";

function HomeStudent() {
  const componentMap = {
    ListTopic: ListTopic,
    ListTest: ListTest,
    ListTest_Skill: ListTest_Skill,
    TestReading: TestReading,
    TestListening: TestListening,
    TestSpeaking: TestSpeaking,
    TestWriting: TestWriting,
  };
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%", pt: '4rem', marginBottom: '-5px'}}
    >
      <HeaderStudent />
      <Stack
        direction="column"
        flexGrow={1}
        justifyContent="flex-start"
        sx={{ overflowY: "auto" }}
      >
        <Routes>
          {site.map((page) => (
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
          ))}
          <Route path="/list-topic/1" element={<Vocabulary />} />
          <Route path="/grammar/1" element={<Grammar />} />
          <Route path="/account" element={<Account/>} />
          <Route path="/" element={<HomePageStudent />} />
          <Route path="/skill/reading/1" element={<Reading />} />
          <Route path="/skill/listening/1" element={<Listening />} />
          <Route path="/skill/speaking/1" element={<Speaking />} />
        </Routes>
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );

}

export default HomeStudent;
