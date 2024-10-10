import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./common/listTopic/ListTopic";
import Footer from "../footer/Footer";
import site from "./common/Pages";
import React from "react";
import ListTest from "./Test/ListTest";
import ListTest_Skill from "./Test/ListTest_Skill";
import TestReading from "./Test/TestReading/TestReading";
import TestListening from "./Test/TestListening";
import TestWriting from "./Test/TestWriting/TestWriting";
import TestSpeaking from "./Test/TestSpeaking/TestSpeaking";
import TestMixing from "./Test/TestMixing/TestMixing";

import HomePageStudent from "./content/HomePageStudent";
import Account from "../account/Account";
import Skills from "./skill/Skills";
import HistoryTest from "./header/HistoryTest";
import StudySchedule from "./header/studyschedule/StudySchedule";

function HomeStudent() {
  const componentMap = {
    ListTopic: ListTopic,
    ListTest: ListTest,
    ListTest_Skill: ListTest_Skill,
    TestReading: TestReading,
    TestListening: TestListening,
    TestSpeaking: TestSpeaking,
    TestWriting: TestWriting,
    TestMixing: TestMixing,
  };
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%", pt: "4rem", marginBottom: "-5px" }}
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
          {site.map((page) => (
            <Route
              key={page.id}
              path={`/${page.path}/:id`}
              element={<page.detail />}
            />
          ))}
          <Route path="/skill" element={<Skills />} />
          <Route path="/account" element={<Account />} />
          <Route path="/" element={<HomePageStudent />} />
          <Route path="/history-test" element={<HistoryTest />} />
          <Route path="/study-schedule" element={<StudySchedule />} />
        </Routes>
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
}

export default HomeStudent;
