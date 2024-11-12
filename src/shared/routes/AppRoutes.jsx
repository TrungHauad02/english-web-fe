import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../../components/Home";
import HomeStudent from "../../components/student/HomeStudent";
import HomePageStudent from "../../components/student/content/HomePageStudent";
import Skills from "../../components/student/skill/Skills";
import Account from "../../components/account/Account";
import HistoryTest from "components/student/menu/historytest/HistoryTest";
import StudySchedulePage from "../../components/student/menu/studyschedule/StudySchedule";
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
import TestListening from "../../components/student/Test/TestListening";
import TestReading from "../../components/student/Test/TestReading/TestReading";
import TestWriting from "../../components/student/Test/TestWriting/TestWriting";
import TestSpeaking from "../../components/student/Test/TestSpeaking/TestSpeaking";
import TestMixing from "../../components/student/Test/TestMixing/TestMixing";
import AuthenticatedRoute from "./AuthenticatedRoute";
import TeacherManagement from "components/teacher/TeacherManagement";
import AdminManagement from "components/admin/AdminManagement";
import ErrorPage from "shared/utils/ErrorPage";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePageStudent />,
    },
    {
      path: "/student",
      element: <HomePageStudent />,
    },
    {
      path: "/account",
      element: <Account />
    },
    {
      path: "/student/*",
      element: (
        <AuthenticatedRoute role="STUDENT">
          <HomeStudent />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage errorType={404}/>,
      children: [
        {
          path: "skill",
          element: <Skills />
        },
        {
          path: "history-test",
          element: <HistoryTest />
        },
        {
          path: "study-schedule",
          element: <StudySchedulePage />
        },
        {
          path: "tests",
          element: <ListTest />
        },
        {
          path: "tests/listening",
          element: <TestListening />
        },
        {
          path: "tests/speaking",
          element: <TestSpeaking />
        },
        {
          path: "tests/reading",
          element: <TestReading />
        },
        {
          path: "tests/writing",
          element: <TestWriting />
        },
        {
          path: "tests/mixing",
          element: <TestMixing />
        },
        ...site.map((page) => ({
          path: page.path,
          element: (
            <page.file
              bg={page.bg}
              title={page.title}
              quote={page.quote}
              path={page.path}
            />
          ),
        })),
        ...site.map((page) => ({
          path: `${page.path}/:id`,
          element: <page.detail />,
        })),
      ],
    },
    {
      path: "/teacher",
      element: (
        <AuthenticatedRoute role="TEACHER">
          <HomeTeacher />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage errorType={404}/>,
    },
    {
      path: "/teacher/*",
      element: (
        <AuthenticatedRoute role="TEACHER">
          <HomeTeacher />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage errorType={404}/>,
      children: [
        {
          path: "",
          element: <TeacherManagement />,
        },
        {
          path: "topics",
          element: <ListTopicManagement title="topics" />,
        },
        {
          path: "topics/:id",
          element: <TopicDetail />,
        },
        {
          path: "grammars",
          element: <ListTopicManagement title="grammars" />,
        },
        {
          path: "grammars/:id",
          element: <GrammarDetail />,
        },
        {
          path: "readings",
          element: <ListTopicManagement title="readings" />,
        },
        {
          path: "readings/:id",
          element: <ReadingDetail />,
        },
        {
          path: "listenings",
          element: <ListTopicManagement title="listenings" />,
        },
        {
          path: "listenings/:id",
          element: <ListeningDetail />,
        },
        {
          path: "writings",
          element: <ListTopicManagement title="writings" />,
        },
        {
          path: "writings/:id",
          element: <WritingDetail />,
        },
        {
          path: "speakings",
          element: <ListTopicManagement title="speakings" />,
        },
        {
          path: "speakings/:id",
          element: <SpeakingDetail />,
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
      path: "/admin",
      element: (
        <AuthenticatedRoute role="ADMIN">
          <HomeAdmin />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage errorType={404}/>,
    },
    {
      path: "/admin/*",
      element: (
        <AuthenticatedRoute role="ADMIN">
          <HomeAdmin />
        </AuthenticatedRoute>
      ),
      errorElement: <ErrorPage errorType={404}/>,
      children: [
        {
          path: "",
          element: <AdminManagement />,
        },
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
    {
      path: "*",
      element: <ErrorPage errorType={404}/>,
    },
  ]);
  return <RouterProvider router={router} />;
}


// export default function AppRoutes() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Home />,
//     },
//     {
//       path: "/student/*",
//       element: <HomeStudent />,
//       children: [
//         { path: "", element: <HomePageStudent /> },
//         { path: "skill", element: <Skills /> },
//         { path: "account", element: <Account /> },
//         { path: "history-test", element: <HistoryTest /> },
//         { path: "study-schedule", element: <StudySchedulePage /> },
//         { path: "tests", element: <ListTest /> },
//         { path: "tests/listening", element: <TestListening /> },
//         { path: "tests/speaking", element: <TestSpeaking /> },
//         { path: "tests/reading", element: <TestReading /> },
//         { path: "tests/writing", element: <TestWriting /> },
//         { path: "tests/mixing", element: <TestMixing /> },
//         ...site.map((page) => ({
//           path: page.path,
//           element: (
//             <page.file
//               bg={page.bg}
//               title={page.title}
//               quote={page.quote}
//               path={page.path}
//             />
//           ),
//         })),

//         ...site.map((page) => ({
//           path: `${page.path}/:id`,
//           element: <page.detail />,
//         })),
//       ],
//     },
//     {
//       path: "/teacher/*",
//       element: <HomeTeacher />,
//       children: [
//         {
//           path: "",
//           element: <TeacherManagement />,
//         },
//         {
//           path: "topics",
//           element: <ListTopicManagement title="topics" />,
//         },
//         {
//           path: "topics/:id",
//           element: <TopicDetail />,
//         },
//         {
//           path: "grammars",
//           element: <ListTopicManagement title="grammars" />,
//         },
//         {
//           path: "grammars/:id",
//           element: <GrammarDetail />,
//         },
//         {
//           path: "readings",
//           element: <ListTopicManagement title="readings" />,
//         },
//         {
//           path: "readings/:id",
//           element: <ReadingDetail />,
//         },
//         {
//           path: "listenings",
//           element: <ListTopicManagement title="listenings" />,
//         },
//         {
//           path: "listenings/:id",
//           element: <ListeningDetail />,
//         },
//         {
//           path: "writings",
//           element: <ListTopicManagement title="writings" />,
//         },
//         {
//           path: "writings/:id",
//           element: <WritingDetail />,
//         },
//         {
//           path: "speakings",
//           element: <ListTopicManagement title="speakings" />,
//         },
//         {
//           path: "speakings/:id",
//           element: <SpeakingDetail />,
//         },
//         {
//           path: "test/mixing",
//           element: <Mixing />,
//         },
//         {
//           path: "test",
//           element: <HomeTest />,
//         },
//       ],
//     },
//     {
//       path: "/admin/*",
//       element: <HomeAdmin />,
//       children: [
//         {
//           path: "",
//           element: <AdminManagement />,
//         },
//         {
//           path: "teacher",
//           element: <ManageTeacher />,
//         },
//         {
//           path: "student",
//           element: <ManageStudent />,
//         },
//       ],
//     },
//   ]);
//   return <RouterProvider router={router} />;
// }

