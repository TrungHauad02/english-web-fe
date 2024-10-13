import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../../components/Home";
import HomeStudent from "../../components/student/HomeStudent";
import HomePageStudent from "../../components/student/content/HomePageStudent";
import Skills from "../../components/student/skill/Skills";
import Account from "../../components/account/Account";
import HistoryTest from "../../components/student/header/HistoryTest";
import StudySchedulePage from "../../components/student/header/studyschedule/StudySchedule";
import ListTopic from "../../components/student/common/listTopic/ListTopic";
import site from "../../components/student/common/Pages";
import HomeTeacher from "../../components/teacher/HomeTeacher";
import HomeAdmin from "../../components/admin/HomeAdmin";
import ManageTeacher from "../../components/admin/teacher/ManageTeacher";
import ManageStudent from "../../components/admin/student/ManageStudent";
import ListTopicManagement from "../../components/teacher/listTopic/ListTopicManagement";
import TopicDetail from "../../components/teacher/details/topic/TopicDetail";
import GrammarDetail from "../../components/teacher/details/grammar/GrammarDetail";
import ReadingDetail from "../../components/teacher/details/reading/ReadingDetail";
import ListeningDetail from "../../components/teacher/details/listening/ListeningDetail";
import WritingDetail from "../../components/teacher/details/writing/WritingDetail";
import SpeakingDetail from "../../components/teacher/details/speaking/SpeakingDetail";
import Mixing from "../../components/teacher/test/Mixing/Mixing";
import HomeTest from "../../components/teacher/test/HomeTest";
import ListTest from "../../components/student/Test/ListTest";
import TestListening from "../../components/student/Test/TestListening"

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/student/*",
      element: <HomeStudent />,
      children: [
        { path: "", element: <HomePageStudent /> },
        { path: "skill", element: <Skills /> },
        { path: "account", element: <Account /> },
        { path: "history-test", element: <HistoryTest /> },
        { path: "study-schedule", element: <StudySchedulePage /> },
        { path: "tests", element: <ListTest /> },
        { path: "tests/listening", element: <TestListening /> },
        ...site.map((page) => ({
          path: page.path,
          element: React.createElement(
            page.file === "ListTopic" ? ListTopic : page.detail,
            {
              list: page.list,
              bg: page.bg,
              title: page.title,
              quote: page.quote,
            }
          ),
        })),

        ...site.map((page) => ({
          path: `${page.path}/:id`,
          element: <page.detail />,
        })),
      ],
    },
    {
      path: "/teacher/*",
      element: <HomeTeacher />,
      children: [
        {
          path: "topic",
          element: <ListTopicManagement title="Topic" />,
          children: [{ path: ":id", element: <TopicDetail /> }],
        },
        {
          path: "grammar",
          element: <ListTopicManagement title="Grammar" />,
          children: [{ path: ":id", element: <GrammarDetail /> }],
        },
        {
          path: "reading",
          element: <ListTopicManagement title="Reading" />,
          children: [{ path: ":id", element: <ReadingDetail /> }],
        },
        {
          path: "listening",
          element: <ListTopicManagement title="Listening" />,
          children: [{ path: ":id", element: <ListeningDetail /> }],
        },
        {
          path: "writing",
          element: <ListTopicManagement title="Writing" />,
          children: [{ path: ":id", element: <WritingDetail /> }],
        },
        {
          path: "speaking",
          element: <ListTopicManagement title="Speaking" />,
          children: [{ path: ":id", element: <SpeakingDetail /> }],
        },
        {
          path: "test/mixing",
          element: <Mixing />,
        },
        {
          path: "test",
          element: <HomeTest />,
        },
      ],
    },
    {
      path: "/admin/*",
      element: <HomeAdmin />,
      children: [
        {
          path: "teacher",
          element: <ManageTeacher />,
        },
        {
          path: "student",
          element: <ManageStudent />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
