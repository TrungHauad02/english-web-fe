import { Stack } from "@mui/material";
import HeaderTeacher from "./header/HeaderTeacher";
import ListTopicManagerment from "./listTopic/ListTopicManagerment";
import Footer from "../footer/Footer";
import { Route, Routes } from "react-router-dom";

export default function HomeTeacher() {
  const sites = [
    "topic",
    "grammar",
    "reading",
    "listening",
    "writing",
    "speaking",
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
            key={site}
            path={`/${site}`}
            element={<ListTopicManagerment key={site} title={site} />}
          />
        ))}
      </Routes>
      <Footer />
    </Stack>
  );
}
