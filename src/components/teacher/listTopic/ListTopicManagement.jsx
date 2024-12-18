import { useState } from "react";
import {
  Stack,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import TopicIcon from "@mui/icons-material/LibraryBooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Link, useLocation } from "react-router-dom";
import TopicList from "./TopicList";
import useColor from "shared/color/Color";
import VocabularyIcon from "@mui/icons-material/EmojiObjects";
import GrammarIcon from "@mui/icons-material/TextSnippet";
import ReadingIcon from "@mui/icons-material/Book";
import SpeakingIcon from "@mui/icons-material/Mic";
import ListeningIcon from "@mui/icons-material/Headset";
import WritingIcon from "@mui/icons-material/ModeEdit";
import TestIcon from "@mui/icons-material/Assignment";
import TestManagement from "../test/HomeTest";

export default function ListTopicManagement({ title }) {
  const color = useColor();
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openStudyResources, setOpenStudyResources] = useState(false);
  const [openTestResources, setOpenTestResources] = useState(false);

  const toggleSidebar = () => setOpenSidebar(!openSidebar);
  const toggleStudyResources = () => setOpenStudyResources(!openStudyResources);
  const toggleTestResources = () => setOpenTestResources(!openTestResources);

  // Cập nhật mảng studyResources để thêm Test
  const studyResources = [
    { name: "Vocabulary", path: "/teacher/topics", icon: <VocabularyIcon /> },
    { name: "Grammar", path: "/teacher/grammars", icon: <GrammarIcon /> },
    { name: "Reading", path: "/teacher/readings", icon: <ReadingIcon /> },
    { name: "Speaking", path: "/teacher/speakings", icon: <SpeakingIcon /> },
    { name: "Listening", path: "/teacher/listenings", icon: <ListeningIcon /> },
    { name: "Writing", path: "/teacher/writings", icon: <WritingIcon /> },
  ];

  // Mảng testResources chứa mục Test
  const testResources = [
    { name: "Test", path: "/teacher/test", icon: <TestIcon /> }, // Mục Test nằm trong Manage test resources
  ];

  return (
    <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
      {/* Sidebar */}
      <Stack
        sx={{
          width: openSidebar ? 240 : isMobile ? 60 : 80,
          transition: "width 0.3s ease",
          backgroundColor: color.Color1,
          minHeight: "100vh",
          padding: "1rem",
          boxShadow: openSidebar ? "2px 0px 10px rgba(0,0,0,0.1)" : "none",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Sidebar Toggle Button */}
        <Stack direction="column" spacing={2} sx={{ marginTop: "auto" }}>
          {!openSidebar && (
            <Button
              onClick={toggleSidebar}
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                "&:hover": {
                  backgroundColor: color.Color2,
                },
                padding: "0.5rem",
              }}
            >
              <MenuIcon />
            </Button>
          )}

          {openSidebar && (
            <Button
              onClick={toggleSidebar}
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                "&:hover": {
                  backgroundColor: color.Color2,
                },
                padding: "0.5rem",
              }}
            >
              <ChevronLeftIcon />
            </Button>
          )}
        </Stack>

        {/* Sidebar Content */}
        <Stack
          spacing={3}
          flex={1}
          sx={{
            padding: "1rem",
            overflowY: "auto",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <List sx={{ width: "100%", padding: 0 }}>
            {/* Manage Study Resources */}
            <ListItem
              button
              onClick={toggleStudyResources}
              sx={{
                backgroundColor: color.Color2_1,
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: color.Color2,
                },
                marginBottom: "1rem",
              }}
            >
              <ListItemIcon
                sx={{ color: "#fff", marginLeft: openSidebar ? 0 : "-0.20rem" }}
              >
                <TopicIcon />
              </ListItemIcon>
              {openSidebar && (
                <ListItemText
                  primary="Manage study resources"
                  sx={{ color: "#fff" }}
                />
              )}
              {openSidebar ? (
                openStudyResources ? (
                  <ExpandLessIcon sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                )
              ) : null}
            </ListItem>

            {/* Collapse for Study Resources */}
            <Collapse in={openStudyResources} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{
                  padding: 2,
                }}
              >
                {/* Render các mục động từ mảng studyResources */}
                {studyResources.map((resource, index) => (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to={resource.path}
                    sx={{
                      backgroundColor:
                        location.pathname === resource.path
                          ? color.Color2_1
                          : "#f9f9f9",
                      minWidth: "2.5rem",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                      marginLeft: openSidebar ? 0 : "-0.8rem",
                      "&:hover": {
                        backgroundColor: color.Color2_1,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === resource.path
                            ? "#fff"
                            : "#454545",
                        minWidth: "auto",
                        paddingRight: "0.25rem",
                        marginLeft: openSidebar ? 0 : "-0.5rem",
                      }}
                    >
                      {resource.icon}
                    </ListItemIcon>
                    {openSidebar && (
                      <ListItemText
                        inset
                        primary={resource.name}
                        sx={{
                          color:
                            location.pathname === resource.path
                              ? "#fff"
                              : "#454545",
                          fontWeight: "bold",
                          paddingLeft: "0.5rem",
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Collapse>

            {/* Manage Test Resources */}
            <ListItem
              button
              onClick={toggleTestResources}
              sx={{
                backgroundColor: color.Color2_1,
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: color.Color2,
                },
                marginBottom: "1rem",
              }}
            >
              <ListItemIcon
                sx={{ color: "#fff", marginLeft: openSidebar ? 0 : "-0.20rem" }}
              >
                <TestIcon />
              </ListItemIcon>
              {openSidebar && (
                <ListItemText
                  primary="Manage test resources"
                  sx={{ color: "#fff" }}
                />
              )}
              {openSidebar ? (
                openTestResources ? (
                  <ExpandLessIcon sx={{ color: "#fff" }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: "#fff" }} />
                )
              ) : null}
            </ListItem>

            {/* Collapse for Test Resources */}
            <Collapse in={openTestResources} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ paddingLeft: 2 }}>
                {/* Render mục Test */}
                {testResources.map((resource, index) => (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to={resource.path}
                    sx={{
                      backgroundColor:
                        location.pathname === resource.path
                          ? color.Color2_1
                          : "#f9f9f9",
                      borderRadius: "4px",
                      marginBottom: "0.5rem",
                      position: openSidebar ? "static" : "absolute",
                      left: openSidebar ? 0 : 0,
                      top: openSidebar ? 0 : index * 50,
                      "&:hover": {
                        backgroundColor: color.Color2_1,
                        cursor: "pointer",
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === resource.path
                            ? "#fff"
                            : "#454545",
                        minWidth: "auto",
                        paddingRight: "0.25rem",
                        marginLeft: openSidebar ? 0 : "-0.25rem",
                      }}
                    >
                      {resource.icon}
                    </ListItemIcon>
                    {openSidebar && (
                      <ListItemText
                        inset
                        primary={resource.name}
                        sx={{
                          color:
                            location.pathname === resource.path
                              ? "#fff"
                              : "#454545",
                          fontWeight: "bold",
                          paddingLeft: "0.5rem",
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </List>
        </Stack>
      </Stack>

      {/* Content Area */}
      <Stack
        direction="column"
        spacing={6}
        sx={{
          flex: 1,
          margin: isMobile ? "1rem" : "2rem",
          padding: isMobile ? "1rem" : "2rem",
        }}
      >
        {title === "test" ? (
          <TestManagement />
        ) : (
          <Typography
            variant="h4"
            textTransform="capitalize"
            fontWeight="bold"
            sx={{
              fontSize: isMobile ? "1.5rem" : "2rem",
            }}
          >
            {title} Management
          </Typography>
        )}
        {title !== "test" && <TopicList title={title} />}
      </Stack>
    </Stack>
  );
}
