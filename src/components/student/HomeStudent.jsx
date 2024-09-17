import { Stack } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import HeaderStudent from "./header/HeaderStudent";
import ListTopic from "./common/ListTopic";
import Footer from "../footer/Footer";
import site from "./common/Pages";
import Vocabulary from "./vocabulary/Vocabulary";
import React from "react";
import ListTest from "./common/Test/ListTest";
import ListTest_Skill from "./common/Test/ListTest_Skill";
import TestReading from "./common/Test/TestReading";
import TestListening from "./common/Test/TestListening";
import TestWriting from "./common/Test/TestWriting";
import TestSpeaking from "./common/Test/TestSpeaking";
import Grammar from "./grammar/Grammar";

function HomeStudent() {
  const componentMap = {
    ListTopic: ListTopic,
    ListTest: ListTest,
    ListTest_Skill: ListTest_Skill,
    TestReading: TestReading,
    TestListening: TestListening,
    TestSpeaking: TestSpeaking,
  };
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%" }}
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
        </Routes>
        <Outlet />
      </Stack>
      <Footer />
    </Stack>
  );
}

export default HomeStudent;
