import { Stack } from "@mui/material";
import HeaderTeacher from "./header/HeaderTeacher";
import ListTopicManagerment from "./listTopic/ListTopicManagerment";
import Footer from "../footer/Footer";
import { Route, Routes } from "react-router-dom";
import TopicDetail from "./details/topic/TopicDetail";
import GrammarDetail from "./details/grammar/GrammarDetail";
import ReadingDetail from "./details/reading/ReadingDetail";
import ListeningDetail from "./details/listening/ListeningDetail";
import WritingDetail from "./details/writing/WritingDetail";
import SpeakingDetail from "./details/speaking/SpeakingDetail";

export default function HomeTeacher() {
  const sites = [
    {
      path: "topic",
      componentDetail: TopicDetail,
    },
    {
      path: "grammar",
      componentDetail: GrammarDetail,
    },
    {
      path: "reading",
      componentDetail: ReadingDetail,
    },
    {
      path: "listening",
      componentDetail: ListeningDetail,
    },
    {
      path: "writing",
      componentDetail: WritingDetail,
    },
    {
      path: "speaking",
      componentDetail: SpeakingDetail,
    },
  ];

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      sx={{ height: "100%", pt: "4rem", marginBottom: "-5px" }}
    >
      <HeaderTeacher />
      <Routes>
        {sites.map((site) => (
          <Route
            key={site.path}
            path={`/${site.path}`}
            element={<ListTopicManagerment key={site.path} title={site.path} />}
          />
        ))}
        {sites.map((site) => (
          <Route
            key={site.path}
            path={`/${site.path}/:id`}
            element={<site.componentDetail path={site.path} />}
          />
        ))}
      </Routes>
      <Footer />
    </Stack>
  );
}
