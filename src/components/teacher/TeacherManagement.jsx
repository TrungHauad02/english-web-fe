import {
  Stack,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import HearingIcon from "@mui/icons-material/Hearing";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import EditIcon from "@mui/icons-material/Edit";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import AssignmentIcon from "@mui/icons-material/Assignment";

const resourceLinks = [
  {
    path: "/teacher/topics",
    label: "Manage vocabulary lessons by topic",
    icon: <BookIcon />,
  },
  {
    path: "/teacher/grammars",
    label: "Manage grammar lessons",
    icon: <MenuBookIcon />,
  },
  {
    path: "/teacher/readings",
    label: "Manage reading comprehension lessons",
    icon: <SpeakerNotesIcon />,
  },
  {
    path: "/teacher/listenings",
    label: "Manage listening comprehension lessons",
    icon: <HearingIcon />,
  },
  {
    path: "/teacher/speakings",
    label: "Manage speaking skills lessons",
    icon: <RecordVoiceOverIcon />,
  },
  {
    path: "/teacher/writings",
    label: "Manage writing skills lessons",
    icon: <EditIcon />,
  },
  {
    path: "/teacher/test",
    label: "Manage tests",
    icon: <AssignmentIcon />,
  },
];

export default function TeacherManagement() {
  return (
    <Stack
      sx={{
        padding: "2rem",
        margin: "2rem auto",
        width: "90%",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      spacing={3}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
      >
        Quản lý tài nguyên học tập
      </Typography>
      <Typography variant="body1" sx={{ textAlign: "center", color: "#666" }}>
        Chào mừng bạn đến với trình quản lý tài nguyên học tập của website học
        tập tiếng Anh. Chọn mục bên dưới để bắt đầu.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {resourceLinks.map((link, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={link.path}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                height: 200,
                width: "90%",
                boxShadow: 3,
                borderRadius: "1rem",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardActionArea
                component={RouterLink}
                to={link.path}
                sx={{ height: "100%" }}
              >
                <CardContent
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  {link.icon}
                  <Typography
                    variant="h6"
                    sx={{ color: "#000", fontWeight: "medium", mt: 1 }}
                  >
                    {link.label}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        {/* Nếu phần tử lẻ nằm ở hàng cuối, căn giữa nó */}
        {resourceLinks.length % 3 === 1 && (
          <Grid item xs={12} container justifyContent="center">
            <Grid item xs={12} sm={6} md={4} />
          </Grid>
        )}
      </Grid>
    </Stack>
  );
}
